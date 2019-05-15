package com.library.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "book")
public class Book {
    @Id
    String id;
    String name;
    String edition;
    long price;
    String issuedUserId;

   

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEdition() {
		return edition;
	}

	public void setEdition(String edition) {
		this.edition = edition;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public String getIssuedUserId() {
		return issuedUserId;
	}

	public void setIssuedUserId(String issuedUserId) {
		this.issuedUserId = issuedUserId;
	}


}