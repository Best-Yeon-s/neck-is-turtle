package com.example.neckisturtle.feature.security;

import com.example.neckisturtle.core.resultMap;
import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.dto.TokenDto;
import com.example.neckisturtle.feature.persistance.UserRepo;
import io.jsonwebtoken.*;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.jsonwebtoken.security.SignatureException;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class TokenService{
    private String secretKey = "token-secret-key-neck-is-turtle, token-secret-key-neck-is-turtle, token-secret-key-neck-is-turtle ";

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public Token generateToken(String uid, String role) {
        long tokenPeriod = Duration.ofMinutes(1).toMillis();;
        long refreshPeriod = Duration.ofDays(10).toMillis();;

        //Claims claims = Jwts.claims().setSubject(uid);
        //claims.put("role", role);
        Date now = new Date();
        return new Token(
                Jwts.builder()
                        .setSubject(uid)
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + tokenPeriod))
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact(),
                Jwts.builder()
                        .setSubject(uid)
                        .setIssuedAt(now)
                        .setExpiration(new Date(now.getTime() + refreshPeriod))
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact());
    }
    public boolean verifyToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (Exception e) {
            return false;
        }
    }


    public String getUid(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }


}
