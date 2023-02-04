package com.example.neckisturtle.feature.controller;

import com.example.neckisturtle.feature.Oauth.UserDto;
import com.example.neckisturtle.feature.dto.*;
import com.example.neckisturtle.feature.service.KakaoService;
import com.example.neckisturtle.feature.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
@Slf4j
public class User {

    private final UserService userService;
    private final KakaoService kakaoService;

    public User(UserService userService, KakaoService kakaoService) {
        this.userService = userService;
        this.kakaoService = kakaoService;
    }

    @GetMapping("/exist/{email}")
    public boolean isExistUser(@PathVariable(name = "email") String email){
        return userService.isExistUser(email);
    }


    @PostMapping("/kakao")
    public String kakaoLogin(@RequestBody KakaoDto dto) throws IOException {
        return kakaoService.SignupAndSignin(dto.getAccess_token());
    }

    @PostMapping("/signin")
    public String signIn(@RequestBody SigninDto dto){
        return userService.signIn(dto);
    }
    @PostMapping("/signup")
    public String signUp(@RequestBody SignupDto dto){
        return userService.signUp(dto);
    }

    @GetMapping("/user-info")
    public UserInfoDto getUserInfo(@RequestHeader(value="Authorization") String Authorization){

        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getUserInfo(userDto.getName());
    }

    @PostMapping("/profile-image")
    public String modifyProfileImage(){
        return "postProfileImage";
    }

    @PutMapping("/name")
    public String modifyName(@RequestHeader(value="Authorization") String Authorization, @ModelAttribute(name = "update")PutUsernameDto nameDto){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.modifyName(userDto.getEmail(), nameDto.getName());
    }

    @PutMapping("/straight-ratio")
    public String setStraightRatio(@RequestHeader(value="Authorization") String Authorization, @ModelAttribute(name = "update")UserUpdateDto.setStraightRatioDto straightDto){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.setStraightRatio(userDto.getName(), straightDto.getStraightRatio());
    }
}
