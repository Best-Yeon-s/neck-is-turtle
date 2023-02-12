package com.example.neckisturtle.feature.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_user")
@Entity

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column
    private String kakaoId;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String image_url;

    @Column
    private Float straight_ratio;

    @Column
    private String accessToken;

    @Column
    private String refreshToken;

    @Column
    private Date reg_dtm;

    @Column
    private String user_yn;

    @Column
    private String sns_type_code;

    public void setStraightRatio(float ratio) {
        this.straight_ratio = ratio;
    }
    public void setAccess_token(String token) {
        this.accessToken = token;
    }

    public void setName(String name){this.name = name; }

    public void setRefresh_token(String token) {
        this.refreshToken = token;
    }
}

