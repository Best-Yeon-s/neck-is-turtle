package com.example.neckisturtle.feature.service;

import com.example.neckisturtle.feature.Oauth.Token;
import com.example.neckisturtle.feature.Oauth.TokenService;
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

@Service
@Slf4j
public class KakaoService {

    @Autowired
    private final UserRepo userRepo;
    @Autowired
    private final TokenService tokenService;

    public KakaoService(UserRepo userRepo, TokenService tokenService) {
        this.userRepo = userRepo;
        this.tokenService = tokenService;
    }

    public String SignupAndSignin(String access_token) throws IOException {
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
                return "없는 유저입니다";
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
                            .access_token(token.getToken())
                            .build();
                    userRepo.save(user);
                    return token.getToken();
                } else {
                    User user = userRepo.findByEmail(email).orElseThrow();
                    accessToken = user.getAccess_token();
                    if (accessToken == null || !tokenService.verifyToken(accessToken)){
                        Token tokens = tokenService.generateToken(user.getEmail(), "USER");
                        user.setAccess_token(tokens.getToken());
                        userRepo.save(user);
                        return tokens.getToken();
                    }else {
                        return user.getAccess_token();
                    }
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
