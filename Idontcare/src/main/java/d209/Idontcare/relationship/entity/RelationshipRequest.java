package d209.Idontcare.relationship.entity;

import d209.Idontcare.TUser;
import d209.Idontcare.common.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Data @Builder
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor @AllArgsConstructor
public class RelationshipRequest extends BaseEntity {
  
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long relationshipRequestId;
  
  @ManyToOne(fetch = FetchType.LAZY)
  private TUser parent;
  
  @ManyToOne(fetch = FetchType.LAZY)
  private TUser child;
}
