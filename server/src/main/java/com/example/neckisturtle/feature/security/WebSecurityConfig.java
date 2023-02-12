package com.example.neckisturtle.feature.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.neckisturtle.feature.service.UserService;

@AllArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    //private final CustomOAuth2UserService oAuth2UserService;
    //private final OAuth2SuccessHandler successHandler;
    private final TokenService tokenService;
    private final UserService userService;

    private final JwtExceptionFilter jwtExceptionFilter;



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/user").authenticated()
                .antMatchers("/user/signup").permitAll()
                .antMatchers("/user/kakao").permitAll()
                .antMatchers("/token/refresh").permitAll()
                .and()
                .addFilterBefore(new JwtAuthFilter(tokenService, userService), UsernamePasswordAuthenticationFilter.class);
                //.oauth2Login().loginPage("/token/expired")
                //.successHandler(successHandler)
                //.userInfoEndpoint().userService(oAuth2UserService);

        //http.addFilterBefore(new JwtAuthFilter(tokenService, userService), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtExceptionFilter, JwtAuthFilter.class);
    }
}