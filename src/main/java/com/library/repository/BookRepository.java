package com.library.repository;


import org.springframework.data.repository.CrudRepository;

import com.library.model.Book;


public interface BookRepository extends CrudRepository<Book, String> {
	
	public Iterable<Book> findByName(String name);
   
}
