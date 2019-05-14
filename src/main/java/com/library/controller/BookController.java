package com.library.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
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

	@RequestMapping(method = RequestMethod.GET, path = "/findBook/{id}")
	public Optional<Book> show(@PathVariable String id) {
		return repository.findById(id);
		
	}

	@RequestMapping(method = RequestMethod.PUT, path = "/updateBook/{id}")
	public Book update(@PathVariable String id, @RequestBody Book book) {
		Optional<Book> optbook = repository.findById(id);
		Book b = optbook.get();
		if (book.getName() != null)
			b.setName(book.getName());
		if (book.getEdition() != null)
			b.setEdition(book.getEdition());
		if (book.getPrice() != 0)	
			b.setEdition(book.getEdition());
		if (book.getIssuedUser() != null)
			b.setIssuedUser(book.getIssuedUser());
		repository.save(b);
		return b;
	}

	@RequestMapping(method = RequestMethod.DELETE, path = "/deleteBook/{id}")
	public String delete(@PathVariable String id) {
		Optional<Book> optbook = repository.findById(id);
		Book book = optbook.get();
		repository.delete(book);

		return "";
	}

}
