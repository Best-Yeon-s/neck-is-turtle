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
    private String name;

    @Column
    private String email;

    @Column
    private String image_url;

    @Column
    private String access_token;

    @Column
    private String refresh_token;

    @Column
    private Date reg_dtm;

    @Column
    private String user_yn;

    @Column
    private String sns_type_code;

}

