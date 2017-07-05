/* Expense.java

	Purpose:
		
	Description:
		
	History:
		Wed Jun 21 15:59:23 CST 2017, Created by rudyhuang

Copyright (C) 2017 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.fragment.demo;

/**
 * @author rudyhuang
 */
public class Expense {
	private Integer id;

	private String date;

	private String category;

	private int amount;

	public Expense() {}

	public Expense(Integer id, String date, String category, int amount) {
		this.id = id;
		this.date = date;
		this.category = category;
		this.amount = amount;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("Expense{");
		sb.append("id=").append(id);
		sb.append(", date='").append(date).append('\'');
		sb.append(", category='").append(category).append('\'');
		sb.append(", amount=").append(amount);
		sb.append('}');
		return sb.toString();
	}
}
