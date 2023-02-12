package com.example.neckisturtle.feature.service;

import com.example.neckisturtle.core.resultMap;
import com.example.neckisturtle.feature.dto.TokenDto;
import com.example.neckisturtle.feature.security.Token;
import com.example.neckisturtle.feature.security.TokenService;
import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.persistance.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service
@Slf4j
public class KakaoService {

    @Autowired
    private final UserRepo userRepo;

    private final TokenService tokenService;

    public KakaoService(UserRepo userRepo, TokenService tokenService) {
        this.userRepo = userRepo;
        this.tokenService = tokenService;
    }

    public resultMap SignupAndSignin(String access_token) throws IOException {
        resultMap result = new resultMap();
        String host = "https://kapi.kakao.com/v2/user/me";
        String jwtToken = null;
        String accessToken = "";

        try{
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            if (responseCode == 401) {
                result.put("status", 401);
                result.put("success", false);
                result.put("message", "잘못된 카카오 요청입니다. (카카오에 유저가 존재하지 않음)");
                return result;
            }else {
                BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
                String line = "";
                String res = "";
                while((line=br.readLine())!=null)
                {
                    res+=line;
                }

                System.out.println("res = " + res);

                JSONParser parser = new JSONParser();
                JSONObject obj = (JSONObject) parser.parse(res);
                JSONObject kakao_account = (JSONObject) obj.get("kakao_account");
                JSONObject properties = (JSONObject) obj.get("properties");

                String id = obj.get("id").toString();
                String email = kakao_account.get("email").toString();
                String profile_image = properties.get("profile_image").toString();

                if (!userRepo.existsByEmail(email)) {
                    Token token = tokenService.generateToken(email, "USER");
                    User user = User.builder()
                            .kakaoId(id)
                            .email(email)
                            .name("kakaoname")
                            .image_url(profile_image)
                            .accessToken(token.getToken())
                            .refreshToken(token.getRefreshToken())
                            .build();
                    userRepo.save(user);
                    TokenDto dto = new TokenDto(token.getToken(), token.getRefreshToken());

                    result.put("status", 200);
                    result.put("success", true);
                    result.put("message", "회원가입 성공");
                    result.put("data", dto);

                    return result;
                } else {
                    User user = userRepo.findByEmail(email).orElseThrow();
                    Token tokens = tokenService.generateToken(user.getEmail(), "USER");
                    user.setAccess_token(tokens.getToken());
                    user.setRefresh_token(tokens.getRefreshToken());
                    userRepo.save(user);
                    TokenDto dto = new TokenDto(tokens.getToken(), user.getRefreshToken());

                    result.put("status", 200);
                    result.put("success", true);
                    result.put("message", "로그인 성공");
                    result.put("data", dto);

                    return result;

//                    accessToken = user.getAccess_token();
//                    String refreshToken = user.getRefresh_token();

//                    if (accessToken == null || !tokenService.verifyToken(accessToken)){
//                        Token tokens = tokenService.generateToken(user.getEmail(), "USER");
//                        user.setAccess_token(tokens.getToken());
//                        userRepo.save(user);
//                        TokenDto dto = new TokenDto(tokens.getToken(), user.getRefresh_token());
//
//                        result.put("status", 200);
//                        result.put("success", true);
//                        result.put("message", "성공");
//                        result.put("data", dto);
//
//                        return result;
//                    }else {
//                        TokenDto dto = new TokenDto(user.getAccess_token(), user.getRefresh_token());
//                        result.put("status", 200);
//                        result.put("success", true);
//                        result.put("message", "성공");
//                        result.put("data", dto);
//                        return result;
//                    }
                }

//            result.put("id", id);
//            result.put("nickname", nickname);
//            result.put("age_range", age_range);

            }
        } catch(IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        
        return null;
    }
}
