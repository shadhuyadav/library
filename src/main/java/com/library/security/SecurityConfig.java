package com.library.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	//Authentication
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{
auth.inMemoryAuthentication().withUser("adminuser").password("{noop}admin").authorities("ROLE_ADMIN");
	}
	//Authorization
@Override
protected void configure(HttpSecurity http) throws Exception{
	
	 http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());	
	 http.csrf().disable().authorizeRequests()
	.antMatchers("**/addBook").hasRole("ADMIN")
	.antMatchers("/","/api**")
	.permitAll().and().httpBasic();
	
	

}

@Override
public void configure(WebSecurity web) {
	web.ignoring().antMatchers("/admin/health","/admin");
}
	
	
}
