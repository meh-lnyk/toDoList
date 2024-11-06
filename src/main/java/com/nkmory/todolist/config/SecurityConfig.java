import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF for testing, enable in production
            .authorizeRequests()
            .requestMatchers(HttpMethod.GET, "/todos/**").permitAll()  // Allow GET requests
            .requestMatchers(HttpMethod.POST, "/todos/**").permitAll() // Allow POST requests
            .anyRequest().authenticated();
        return http.build();
    }
}

