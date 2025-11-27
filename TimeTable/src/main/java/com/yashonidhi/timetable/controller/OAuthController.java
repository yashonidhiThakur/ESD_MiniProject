package com.yashonidhi.timetable.controller;

import com.yashonidhi.timetable.service.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class OAuthController {

    private final TokenService tokenService;
    private final org.springframework.context.ApplicationContext applicationContext;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        String authorizationUri = UriComponentsBuilder.fromHttpUrl("https://accounts.google.com/o/oauth2/v2/auth")
                .queryParam("client_id", clientId)
                .queryParam("redirect_uri", redirectUri)
                .queryParam("response_type", "code")
                .queryParam("scope", "openid email profile")
                .build().toUriString();

        response.sendRedirect(authorizationUri);
    }

    @GetMapping("/oauth2/callback")
    public void callback(@RequestParam("code") String code, HttpServletResponse response) throws IOException {
        try {
            // 1. Exchange code for tokens
            TokenService.GoogleTokenResponse tokenResponse = tokenService.exchangeCode(code);

            // 2. Validate token to get email
            java.util.Map<String, Object> claims = tokenService.validateToken(tokenResponse.idToken());
            String email = (String) claims.get("email");
            System.out.println("OAuth Callback: Email from token: " + email);

            // 3. Check if user exists in DB
            try {
                com.yashonidhi.timetable.service.StudentService studentService = applicationContext.getBean(com.yashonidhi.timetable.service.StudentService.class);
                studentService.getStudentByEmail(email);
            } catch (Exception e) {
                // User not found
                System.out.println("OAuth Callback: User not found in DB: " + email);
                response.sendRedirect("http://localhost:3000?error=unauthorized");
                return;
            }

            // 4. Create HTTP-only cookie for ID Token
            Cookie cookie = new Cookie("ID_TOKEN", tokenResponse.idToken());
            cookie.setHttpOnly(true);
            cookie.setSecure(false); // Set to true in production (HTTPS)
            cookie.setPath("/");
            cookie.setMaxAge(tokenResponse.expiresIn());

            // 5. Add cookie to response
            response.addCookie(cookie);

            // 6. Redirect to frontend
            response.sendRedirect("http://localhost:3000");
        } catch (Exception e) {
            e.printStackTrace();
            response.sendRedirect("http://localhost:3000?error=server_error");
        }
    }
    
    @GetMapping("/signout")
    public void signout(HttpServletResponse response) throws IOException {
        Cookie cookie = new Cookie("ID_TOKEN", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // Delete cookie
        response.addCookie(cookie);
        
        response.sendRedirect("http://localhost:3000");
    }
}
