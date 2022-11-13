package com.example.neckisturtle.feature.Oauth;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

@AllArgsConstructor
@Slf4j
class JwtAuthFilter extends GenericFilterBean {
    private final TokenService tokenService;
    private final UserService userService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException, IOException {
        String token = ((HttpServletRequest)request).getHeader("Authorization");
        log.info("token {}", token);
        log.info("verify {}", tokenService.verifyToken(token));
        if (token != null && tokenService.verifyToken(token)) {
            String email = tokenService.getUid(token);
            User user = userService.findByEmail(email).orElseThrow();

            // DB연동을 안했으니 이메일 정보로 유저를 만들어주겠습니다
            UserDto userDto = UserDto.builder()
                    .email(email)
                    .name(user.getName())
                    .picture(user.getImage_url())
                    .build();

            Authentication auth = getAuthentication(userDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(UserDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
