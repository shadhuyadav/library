package com.library.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.library.model.Book;
import com.library.repository.BookRepository;

@RestController
@RequestMapping(value = "/api")
public class BookController {
	private static final Logger logger = LoggerFactory.getLogger(BookController.class);

	@Autowired
	BookRepository repository;
	@Autowired
    MongoTemplate template;
	

	@RequestMapping(method = RequestMethod.GET, path = "/listBooks")
	public Iterable<Book> book() {
		logger.info("Fetch list of books");
		return repository.findAll();
	}

	@RequestMapping(method = RequestMethod.POST, path = "/addBook")
	public Book save(@RequestBody Book book) {
		repository.save(book);

		return book;
	}

	@RequestMapping(method = RequestMethod.GET, path = "/findBook/{name}")
	public Iterable<Book> show(@PathVariable String name) {
		return repository.findByName(name);
		
		
		
	}

}
