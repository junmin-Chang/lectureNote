---
title: '링크드 리스트(Linked List)'
date: '2021-08-14'
tag: 'data-structure'
---

> 링크드 리스트는 리스트를 구현하는 여러가지 방법 중 가장 간단한 방법으로 꼽히는 자료구조 입니다.

## 리스트 내의 요소
- 노드(Node)
  - '마디' 라는 뜻으로 리스트는 노드와 노드를 연결해서 만드는 리스트 라고 생각하시면 됩니다.
  - 노드는 스택, 큐, 트리 등에서 계속 사용될 용어이니 알아두셔야 합니다.
    
    

![images](https://www.alphacodingskills.com/imgfiles/linked-list-node.PNG)

> 다음과 같이 링크드 리스트의 노드는 데이터를 보관하는 필드, 다음 노드와의 연결 고리를 담당하는 포인터로 이루어집니다.
> 이 노드 단위를 연결(link) 하다 보면 링크드 리스트가 완성이 되는 것이죠.

![images](https://www.educative.io/api/page/6100383094013952/image/download/4542257903435776)


### 장점
리스트의 첫번째 노드를 헤드(Head)라고 하고 마지막 노드를 테일(Tail)이라고 합니다.

우리가 배열을 만들 때 크기도 지정을 해줬어야 했는데, 링크드 리스트에서는 그럴 필요가 없습니다. 다뤄야 하는 데이터 집합의 크기를 미리 알지
못해도 상관이 없기 때문 입니다.

데이터가 늘어날 때마다 노드를 만들어서 테일에 붙이면 됩니다. 새롭게 붙인 노드는 테일이 되고 이전에 테일이었던 노드는 
다시 평범한 노드가 됩니다.


## Code (링크드 리스트의 노드)
###  c언어  
```c
struct Node {
    int Data; /* 데이터 필드 */
    struct Node* NextNode; /* 다음 노드를 가리키는 포인터 */
    
    /* 구조체 인스턴스 생성 */
    struct Node MyNode;
}
```


## 링크드 리스트의 주요 연산
- 노드 생성/소멸 (링크드 리스트 구축을 위해)
- 노드 추가
- 노드 탐색 (링크드 리스트 자료 활용)
- 노드 삭제
- 노드 삽입


## Code (노드 생성)
### c언어

```c
Node* CreateNode(ElementType NewData) {
    Node* NewNode = (Node*)malloc(sizeof(Node));
    
    NewNode->Data = NewData; /* 데이터 저장 */
    NewNode->NextNode = NULL; /* 다음 노드에 대한 포인터는 NULL */
    
    return NewNode; /* 노드 주소 반환 */
}
```


## Code (노드 소멸)
### c언어

```c
void DestroyNode(Node* Node) {
    free(Node);
    
    /* 노드가 있는 주소를 넣어주면 free 함수가 노드 소멸 */
}
```

## Code (노드 추가)
새로 만든 노드의 주소를 테일의 NextNode 포인터에 전달
### c언어
```c
void AppendNode(Node** Head, Node* NewNode) {
    /* 헤드가 Null이라면 새로운 노드가 Head */
    if ((*Head) === NULL) {
        *Head = NewNode;
    } else {
        Node* Tail = (*Head);
        while (Tail->NextNode != NULL) {
            Tail = Tail->NextNode;
        }
        Tail->NextNode = NewNode;
    }
}

/* 사용법 */
Node* List = NULL;
Node* NewNode = NULL;

NewNode = CreateNode(1); /* 새로운 노드 생성 */
AppendNode(&List, NewNode); /* 생성한 노드를 List에 추가 */
NewNode = CreateNode(2); /* 새로운 노드 생성 */
AppendNode(&List, NewNode); /* 생성한 노드를 List에 추가 */


```

### Code (노드 탐색)
> 탐색은 링크드 리스트의 구린점 중 하나이다. 배열은 인덱스를 통해 빠르게 요소를 탐색하는데 반해, 링크드 리스트는 헤드부터 시작해서
> 찾을 때 까지 다음 노드를 계속 타고 가야하기 때문이다.

### c언어

```c
Node* GetNodeAt(Node* Head, int Location) {
    Node* Current = Head;
    
    while (Current !== NULL && (--Location) >= 0) {
        Current = Current->NextNode;
    }
    return Current;
}

/* 사용법 */
Node* List = NULL;
Node* MyNode = NULL;

AppendNode(&List, CreateNode(1));
AppendNode(&List, CreateNode(2));

MyNode = GetNodeAt(List, 1); /* 두번 째 노드 주소를 MyNode에 저장 */
printf("%d\n", MyNode->Data); /* 2 출력 */
```

## Code (노드 삭제)
>링크드 리스트 안에 있는 임의 노드를 제거하는 연산. 삭제할 노드를 찾고, 그 노드의 다음 노드를 이전 노드의 NextNode 포인터에서
끊어버리면 됩니다.

![images](https://i.stack.imgur.com/rVCdE.png)
### c언어

```c
void RemoveNode(Node** Head, Node* Remove) {
    if (*Head == Remove) {
        *Head = Remove->NextNode;
    } else {
        Node* Current = *Head;
        while (Current !== NULL && Current->NextNode !== Remove) {
            Current = Current->NextNode;
        }
        if (Current !== NULL) {
            Current->NextNode = Remove->NextNode;
        }
    }
}

/* 사용법 */
Node* List = NULL;
Node* MyNode = NULL;

AppendNode(&List, CreateNode(1));
AppendNode(&List, CreateNode(2));
AppendNode(&List, CreateNode(3));

MyNode = GetNodeAt(List, 1) /* 두 번째 노드 주소를 MyNode에 저장 */
RemoveNode(&List, MyNode); /* 두번 째 노드 삭제 */
DestroyNode(MyNode); /* 메모리에서 완전 소멸 */ 
```

### 노드 삽입
> 노드와 노드 사이에 새로운 노드를 삽입하는 연산. 앞 노드의 NextNode 포인터가 새로운 노드를 가리키게 하고,
> 새로운 노드의 NextNode 포인터가 뒤 노드를 가리키게 한다.

### c언어

```c
void InsertNode(Node* Current, Node* NewNode) {
    NewNode->NextNode = Current->NextNode;
    Current->NextNode = NewNode;
}
```

### 노드 개수 세기
### c언어

```c
int NodeCount(Node* Head) {
    int Count = 0;
    Node* Current = Head;
    
    while (Current !== NULL) {
        Current = Current->NextNode;
        Count++;
    }
    
    return Count;
}
```

> 링크드 리스트는 삽입, 삭제, 추가 등은 빠르다. 하지만 자료를 탐색 하는 것은 헤드에서부터 테일까지 순차적으로 
> 봐야하기 때문에 느리다. 이것이 링크드 리스트의 단점이다. 만약 n개의 자료가 있는데 특정 자료를 찾으려 한다면 최악의 경우
> n개를 다 돌아봐야 하는 경우가 생길 수 있다.