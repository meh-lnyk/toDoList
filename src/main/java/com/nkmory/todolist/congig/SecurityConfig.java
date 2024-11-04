package com.nkmory.todolist.config; // Adjust the package name as necessary

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/todos").permitAll() // Allow access to /todos for GET and POST
                .anyRequest().authenticated() // Require authentication for all other requests
            .and()
            .formLogin(); // Enable form-based authentication
    }
}
