package com.example.newsPortal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class NewsPortalApplication {

	public static void main(String[] args) {
		
		System.out.println("EUREKA_URL_FROM_ENV = " + System.getenv("EUREKA_CLIENT_SERVICE-URL_DEFAULTZONE"));
		
		
		SpringApplication.run(NewsPortalApplication.class, args);
	}

}
