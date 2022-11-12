package com.example.neckisturtle.feature.Oauth;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes; // OAuth2 반환하는 유저 정보 Map
    private String attributeKey;
    private String name;
    private String email;
    private String picture;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String attributeKey, String name, String email, String picture) {
        this.attributes = attributes;
        this.attributeKey = attributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }
    public static OAuthAttributes of(String registrationId, String attributeKey, Map<String,Object> attributes){

        return ofNaver(attributeKey,attributes);

    }
    private static OAuthAttributes ofNaver(String attributeKey, Map<String, Object> attributes){
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .picture((String) response.get("picture"))
                .attributes(response)
                .attributeKey(attributeKey)
                .build();
    }

}
