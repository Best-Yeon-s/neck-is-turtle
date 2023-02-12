package com.example.neckisturtle.feature.service;

import com.example.neckisturtle.core.resultMap;
import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.dto.TokenDto;
import com.example.neckisturtle.feature.persistance.UserRepo;
import com.example.neckisturtle.feature.security.TokenService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@Slf4j
public class MyTokenService {
    private final TokenService tokenService;
    private final UserRepo userRepo;

    public MyTokenService(TokenService tokenService, UserRepo userRepo) {
        this.tokenService = tokenService;
        this.userRepo = userRepo;
    }

    public resultMap refreshToken( HttpServletRequest request, HttpServletResponse response) {
        resultMap result = new resultMap();
        String token = request.getHeader("Refresh");

        if (token != null) {
            try {
                String tokenEmail = tokenService.getUid(token);
                boolean isTokenExists = userRepo.existsByRefreshToken(token);

                if (isTokenExists) {

                    String accessToken = tokenService.generateToken(tokenEmail, "USER").getToken();
                    TokenDto tokenDto = new TokenDto(accessToken, null);
                    result.put("status", 200);
                    result.put("success", true);
                    result.put("data", tokenDto);
                }else {
                    result.put("status", 401);
                    result.put("success", false);
                    result.put("message", "존재하지 않는 토큰");
                }
                return result;
            } catch (IllegalArgumentException e) {
                result.put("status", 401);
                result.put("success", false);
                result.put("message", "유효하지 않은 토큰");
            } catch (ExpiredJwtException e) {
                result.put("status", 401);
                result.put("success", false);
                result.put("message", "토큰 기한 만료");
                return result;
                //throw new JwtException("토큰 기한 만료");
            } catch(SignatureException e){
                result.put("status", 401);
                result.put("success", false);
                result.put("message", "사용자 인증 실패");
            }
        }else{
            result.put("statue", 400);
            result.put("success", false);
            result.put("message", "잘못된 요청입니다.");
        }
        return result;

//        throw new RuntimeException();
    }
}
