---
title: 'Stack(스택)'
date: '2021-08-18'
tag: 'data-structure'
---

# 개요

![images](https://thumbs.dreamstime.com/b/pile-books-table-pile-books-table-158640732.jpg)

드디어 유명한 자료구조 중 하나인 스택에 대해 알아보는 시간입니다. 위에 책 더미가 보이시나요?
영단어로도 알 수 있듯이 스택 자료구조는 저런 더미(pile) 형태로 되어있다고 보시면 됩니다.

저렇게 쌓여있는 책들 중에 하나의 책을 뺀다고 생각해봅시다. 중간에 끼워져 있는 책을 한번에 빼버리면 책 더미가 무너져
내리겠죠? 보통은 맨 위에 있는 책을 먼저 뺍니다. 

스택도 마찬가지입니다. '맨 위에 있는 데이터' 만을 넣고 뺄 수 있습니다. 새로운 데이터를 넣을 때도 맨 위에 넣고, 
데이터를 뺄 때도 맨 위에서 뺍니다. 데이터를 스택 중간에 넣고 뺄 수 없습니다.

그렇다보니 스택 자료구조의 특징은 후입선출 (Last In, First Out) 입니다. 마지막에 쌓은 책(데이터)이 가장 먼저 빠지겠죠 ?
반면에 마지막으로 넣은 책(맨 밑에 있는 책)은 위에 있는 책들이 없어야 뺄 수 있기 때문에 가장 먼저 나중에 뺄 수 있습니다.
선입후출(First In, Last Out)

# 주요 연산

> 스택의 주요 연산은 링크드 리스트보다는 간단합니다. 주요 기능은 2가지로 나뉩니다.

### - 삽입
### - 제거

![images](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_JCKnxpttx_h_NXyhTABnHkqOdQ4LE-gug&usqp=CAU)

> 스택은 배열을 이용하거나 링크드 리스트를 이용해서 구현이 가능합니다. 배열을 이용해볼건데, 배열을 이용해서 스택을 구현하면 
> 구현이 비교적 간단하다는 장점이 있습니다. 하지만 동적으로 용량을 조절하는 것이 어렵다는 단점이 있습니다.

배열 기반 스택은 스택을 생성할 때 부여한 용량만큼 노드를 '한꺼번에 생성' 합니다. 또한 '최상위 노드의 위치를 나타내는
변수' 를 이용해 삽입과 제거 연산을 수행합니다. 


# 스택과 스택의 노드 구조체로 표현
```c
typedef int ElementType;

// 노드 구조체
typedef struct tagNode {
    ElementType Data;
} Node;

// 스택 구조체
typedef struct tagArrayStack {
    // 용량
    int Capacity;
    // 최상위 노드 위치
    int Top;
    // 노드배열
    Node* Nodes;
} ArrayStack;
```

# 연산 구현

## 스택의 생성, 소멸

```c
void AS_CreateStack(ArrayStack** Stack, int Capacity) {
    // 스택을 Heap 영역에 생성
    (*Stack) = (ArrayStack*)malloc(sizeof(ArrayStack));
    // Capacity 만큼 노드를 Heap 영역에 생성
    (*Stack)->Nodes = (Node*)malloc(sizeof(Node) * Capacity);
    
    // Capacity, Top 초기화
    (*Stack)->Capacity = Capacity;
    (*Stack)->Top = 0;
}

void AS_DestroyStack(ArrayStack* Stack) {
    // 노드를 Heap 영역에서 해제
    free(Stack->Nodes);
    
    // 스택을 Heap 영역에서 해제
    free(Stack);
}
```

### 삽입(push), 제거(pop)

삽입과 제거는 간단합니다. 삽입과 제거를 하려면 스택의 맨 위에서 수행되어야 한다고 그랬죠? 
삽입 연산은 취상위 노드의 위치(Top)에 1을 더한 곳에 새 노드를 놓으면 됩니다. 새 노드를 스택에 올린 후에 
Top 값을 1 증가 시킵니다.

제거 연산에서는 Top 값을 1 낮추면 됩니다. 하지만 제거 연산에서는 최상위 노드의 데이터를 반환해야 한다는 것에서 차이가
있습니다.

```c
void AS_Push(ArrayStack* Stack, ElementType Data) {
    int Position = Stack->Top;
    
    Stack->Nodes[Position].Data = Data;
    Stack->Top++;
}

ElementType AS_Pop(ArrayStack* Stack) {
    // 최상위 노드 인덱스 = Top - 1
    int Position = --(Stack->Top);
    
    return Stack->Nodes[Position].Data;
}
```
