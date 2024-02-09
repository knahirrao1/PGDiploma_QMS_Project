package com.app.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
@Embeddable
public class GuestEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name = "quiz_id", nullable = false, foreignKey = @ForeignKey(name = "fk_guestkey_quiz"))
	private Quiz quiz;
	
	private String username;
	
	@Override
	public int hashCode() {
		return Objects.hash(username, quiz);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GuestEntity other = (GuestEntity) obj;
		return Objects.equals(username, other.username) && Objects.equals(quiz, other.quiz);
	}
}
