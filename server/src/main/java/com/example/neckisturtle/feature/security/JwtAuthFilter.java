package com.example.neckisturtle.feature.security;

import java.io.IOException;
import java.util.Arrays;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
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

        if (token != null) {
            try {
            String email = tokenService.getUid(token);
            User user = userService.findByEmail(email).orElseThrow();

            UserDto userDto = UserDto.builder()
                    .email(email)
                    .name(user.getName())
                    .picture(user.getImage_url())
                    .build();

            Authentication auth = getAuthentication(userDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (IllegalArgumentException e) {
                logger.error("an error occured during getting username from token", e);
                // JwtException (custom exception) 예외 발생시키기
                throw new JwtException("유효하지 않은 토큰");
            } catch (ExpiredJwtException e) {
                logger.warn("the token is expired and not valid anymore", e);
                throw new JwtException("토큰 기한 만료");
            } catch(SignatureException e){
                logger.error("Authentication Failed. Username or Password not valid.");
                throw new JwtException("사용자 인증 실패");
            }
        }else {
            System.out.println("토큰이 없잖아 !");
        }
        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(UserDto member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
