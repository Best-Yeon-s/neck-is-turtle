package com.example.neckisturtle.feature.Oauth;

import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserRequestMapper {

    public UserDto toDto(OAuth2User oAuth2User) {
        UserDto entity = new UserDto();
        BeanUtils.copyProperties(oAuth2User, entity);
        return entity;
    }
}