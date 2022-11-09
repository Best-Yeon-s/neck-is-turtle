package com.example.neckisturtle.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Bean
    public Docket swaggerApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())   // 현재 RequestMapping으로 할당된 모든 URL 리스트 추출
                .paths(PathSelectors.any())            // PathSelectorys.any("/api/**")) 와 같이 /api/** 인 URL로만 필터링 할 수 있습니다.
                .build();
    }

    private ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
                .title("냉장고를 부탁해 API")
                .description("냉장고 식품 리스트를 종합적으로 관리하는 냉장고를 부탁해 서비스 API 리스트")
                .contact(new Contact("[help_refrigerator Swagger]", "https://github.com/hyeyeon-sun/help_refrigerator", ""))
                .version("1.0")
                .build();
    }
}
