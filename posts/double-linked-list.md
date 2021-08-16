---
title: '더블 링크드 리스트'
date: '2021-08-16'
tag: 'data-structure'
---

# 개요
> 더블 링크드 리스트는 링크드 리스트의 탐색 기능을 개선한 자료구조입니다.
> 기존 링크드 리스트는 헤드부터 시작하여 테일까지 훑어가면서 탐색을 진행했지만
> >더블 링크드 리스트는 양방향으로 탐색을 할 수 있다는 것입니다.

기존 링크드 리스트는 노드에 다음 노드를 가리키는 포인터를 가지고 있었지만, 더블 링크드 리스트는
자신의 뒤에 있는 노드 뿐만 아니라 앞에 있는 노드까지 가리키는 포인터를 가지고 있습니다. 이를 통해서
양방향으로 탐색을 진행할 수 있다는 것이죠.

![images](https://www.studytonight.com/code/python/ds/images/doubly-linked-list-1.png)

```c
typedef struct tagNode {
    int Data;
    struct tagNode* PrevNode; // 이전 노드를 가리키는 포인터 추가
    struct tagNode* NextNode;
}
```

# 주요 연산
> 링크드 리스트와 다를 것이 없습니다. 그저 앞에 있는 노드를 가리키는 로직이 추가될 뿐입니다.

## 노드 생성/소멸
```c
// Node 생성 
// DLL = Double Linked List
Node* DLL_CreateNode(ElementType NewData) {
    Node* NewNode = (Node*)malloc(sizeof(Node));
    NewNode->Data = NewData;
    NewNode->PrevNode = NULL;
    NewNode->NextNode = NULL;
    
    return NewNode;
}

// Node 소멸
void DLL_DestroyNode(Node* Node) {
    free(Node);
}
```

## 노드 추가
> 더블 링크드 리스트에서는 새로 추가된 테일의 PrevNode가 기존 Tail을 가리키도록 해야함(추가)
```c
void DLL_AppendNode(Node** Head, Node* NewNode) {
    // Head가 NULL이라면 NewNode가 Head
    if ((*Head) == NULL) {
        *Head = NewNode;
    } else {
        // Tail을 찾아서 NewNode 연결
        Node* Tail = (*Head);
        while(Tail->NextNode != NULL) {
            Tail = Tail->NextNode;
        }
        Tail->NextNode = NewNode;
        // 기존 Tail을 새로운 Tail의 PrevNode가 가리킨다.
        NewNode->PrevNode = Tail;       
    }
}
```

## 노드 탐색
> SLL(Single Linked List)와 동일
```c
Node* DLL_GetNodeAt(Node* Head, int Location) {
    Node* Current = Head;
    
    while(Current != NULL && (--Location) >= 0) {
        Current = Current->NextNode;
    }
    
    return Current;
}
```

## 노드 삭제
> 복잡함.

삭제할 노드의 NextNode 포인터가 가리키고 있던 노드를 앞에 있는 노드의 NextNode 포인터가 가리키게하고
삭제할 노드의 PrevNode 포인터가 가리키고 있던 곳을 뒤에 있는 노드의 PrevNode 포인터가 가리키게 만든다.
또한 삭제할 노드의 PrevNode, NextNode 를 NULL 로 초기화.

![image](https://qph.fs.quoracdn.net/main-qimg-34860850f339d410a984460b1a35c877.webp)

```c
void DLL_RemoveNode(Node** Head, Node* Remove) {
    if (*Head == Remove) {
        *Head = Remove->NextNode;
        if ((*Head) != NULL) {
            (*Head)->PrevNode = NULL;
        }
        Remove->PrevNode = NULL;
        Remove->NextNode = NULL;
    } else {
        Node* Temp = Remove;
        
        if (Remove->PrevNode != NULL) {
            Remove->PrevNode->NextNode = Temp->NextNode;
        }
        if (Remove->NextNode != NULL) {
            Remove->NextNode->PrevNode = Temp->PrevNode;
            Remove->PrevNode = NULL;
            Remove->NextNode = NULL;
        }
    }
}
```

## 노드 삽입
> 조금 덜 복잡

새로운 노드는 PrevNode 포인터로 앞 노드를 가리키고, NextNode 는 뒷 노드를 가리킨다.
또한 앞 노드의 NextNode 는 새로운 노드를 가리키고 뒷 노드의 PrevNode 도 새로운 노드를 가리킨다.

![images](https://media.geeksforgeeks.org/wp-content/cdn-uploads/gq/2014/03/DLL_add_middle1.png)
```c
void DLL_InsertAfter(Node* Current, Node* NewNode) {
    NewNode->NextNode = Current->NextNode;
    NewNode->PrevNode = Current;
    
    if (Current->NextNode != NULL) {
        Current->NextNode->PrevNode = NewNode;
    }
    Current->NextNode = NewNode;
}
```

## 노드 개수 세기
> SLL 과 동일함

```c
int DLL_GetNodeCount(Node* Head) {
    unsigned int Count = 0;
    Node* Current = Head;
    
    while (Current != NULL) {
        Current = Current->NextNode;
        Count++;
    }
    return Count;
}
```