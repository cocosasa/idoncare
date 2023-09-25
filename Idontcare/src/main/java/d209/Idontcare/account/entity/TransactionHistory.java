package d209.Idontcare.account.entity;

import d209.Idontcare.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class TransactionHistory {

    @Id @Column(name = "TRANSACTION_HISTORY_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long transactionHistoryId;

    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    @Column(name = "CONTENT")
    String content;

    @Column(name="CREATED_AT")
    @CreatedDate
    LocalDateTime localDateTime;

    @Column(name = "AMOUNT")
    Long amount;

    @Column(name = "TYPE") @Enumerated(EnumType.STRING)
    Type type;

    @Column(name = "BALANCE")
    Long balance;
    
    public TransactionHistory(User user, String content, Long amount, Type type, Long balance){
        this.user = user;
        this.content = content;
        this.amount = amount;
        this.type = type;
        this.balance = balance;
    }
}
