---
title: '환형 링크드 리스트'
date: '2021-08-16'
tag: 'data-structure'
---

# 개요
![image](https://image-notepet.akamaized.net/article/201905/fb_506fd883017c95a4240c88609d07acab.png)


> 환형 링크드 리스트는 헤드가 테일을 물고 있는 형태의 링크드 리스트 입니다.
> - 테일의 NextNode 는 헤드이다.
> - 헤드의 PrevNode 는 테일이다.

![images](https://programmercave0.github.io/assets/circulardoublylinkedlist.png)

환형(circular)으로 링크드 리스트를 구현하면, 헤드부터 시작해서 테일까지 접근하지 않아도 돼서 테일까지
접근하는 비용이 거의 없습니다. 따라서 노드를 추가하는 작업을 개선시킬 수 있습니다.

# 주요 연산(환형 더블 링크드 리스트)
- 노드 추가
- 노드 삭제
- 나머지는 더블 링크드 리스트와 동일

# 노드 추가
> 만약 리스트가 비어있다면 새 노드가 Head 가 된다. 이 경우
> - 헤드의 앞 노드가 헤드가 된다.
> - 헤드의 뒷 노드 또한 헤드 자신이 된다.

![images](https://media.geeksforgeeks.org/wp-content/uploads/Insertion-in-a-list.png)

```c
void CDLL_AppendNode(Node** Head, Node* NewNode) {
    // 헤드가 NULL 이라면 새 노드가 Head
    if ((*Head) == NULL) {
        *Head = NewNode;
        (*Head)->NextNode = *Head;
        (*Head)->PrevNode = *Head;
    } else {
        // 테일과 헤드 사이에 NewNode 삽입
        Node* Tail = (*Head)->PrevNode;
        
        Tail->NextNode->PrevNode = NewNode;
        Tail->NextNode = NewNode;
        
        NewNode->NextNode = (*Head);
        // 기존 테일을 새로운 테일의 PrevNode가 가리킴
        NewNode->PrevNode = Tail;
    }
}
```

# 노드 삭제
> 테일과 헤드가 연결되어 있는 것 말곤 DLL 과 다를게 없다.

![images](https://media.geeksforgeeks.org/wp-content/uploads/Delete_middle_node.png)

```c
void CDLL_RemoveNode(Node** Head, Node* Remove) {
    if (*Head == Remove) {
        (*Head)->PrevNode->NextNode = Remove->NextNode;
        (*Head)->NextNode->PrevNode = Remove->PrevNode;
        
        *Head = Remove->NextNode;
        
        Remove->PrevNode = NULL;
        Remove->NextNode = NULL;
    } else {
        Node* Temp = Remove;
        
        Remove->PrevNode->NextNode = Temp->NextNode;
        Remove->NextNode->PrevNode = Temp->PrevNode;
        
        Remove->PrevNode = NULL;
        Remove->NextNode = NULL;
    }
}
```