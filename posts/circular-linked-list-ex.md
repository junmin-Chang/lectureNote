---
title: '환형 링크드 리스트 구현'
date: '2021-08-18'
tag: 'data-structure'
---

# Header File

```c
//
//  CircularDoublyLinkedList.h
//  CDLL
//
//  Created by junmin chang on 2021/08/16.
//

#ifndef CircularDoublyLinkedList_h
#define CircularDoublyLinkedList_h
#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;

typedef struct tagNode {
    ElementType Data;
    struct tagNode* PrevNode;
    struct tagNode* NextNode;
} Node;

Node* CDLL_CreateNode(ElementType NewData);
void CDLL_DestroyNode(Node* Node);
void CDLL_AppendNode(Node** Head, Node* NewNode);
void CDLL_InsertAfter(Node* Current, Node* NewNode);
void CDLL_RemoveNode(Node** Head, Node* Remove);
Node* CDLL_GetNodeAt(Node* Head, int Location);
int CDLL_GetNodeCount(Node* Head);

#endif /* CircularDoublyLinkedList_h */
```


# 함수 구현 코드

```c
//
//  CircularDoublyLinkedList.c
//  CDLL
//
//  Created by junmin chang on 2021/08/16.
//

#include <stdio.h>
#include "CircularDoublyLinkedList.h"

Node* CDLL_CreateNode(ElementType NewData) {
    Node* NewNode = (Node*)malloc(sizeof(Node));
    
    NewNode->Data = NewData;
    NewNode->PrevNode = NULL;
    NewNode->NextNode = NULL;
    
    return NewNode;
}

void CDLL_DestroyNode(Node* Node) {
    free(Node);
}

void CDLL_AppendNode(Node** Head, Node* NewNode) {
    if ((*Head) == NULL) {
        *Head = NewNode;
        (*Head)->NextNode = *Head;
        (*Head)->PrevNode = *Head;
    } else {
        Node* Tail = (*Head)->PrevNode;
        
        Tail->NextNode->PrevNode = NewNode;
        Tail->NextNode = NewNode;
        
        NewNode->NextNode = (*Head);
        NewNode->PrevNode = Tail;
    }
}

void CDLL_InsertAfter(Node* Current, Node* NewNode) {
    NewNode->NextNode = Current->NextNode;
    NewNode->PrevNode = Current;
    
    Current->NextNode->PrevNode = NewNode;
    Current->NextNode = NewNode;
}

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

Node* CDLL_GetNodeAt(Node* Head, int Location) {
    Node* Current = Head;
    
    while (Current != NULL && (--Location) >= 0) {
        Current = Current->NextNode;
    }
    return Current;
}

int CDLL_GetNodeCount(Node* Head) {
    unsigned int Count = 0;
    Node* Current = Head;
    
    while (Current != NULL) {
        Current = Current->NextNode;
        Count++;
        
        if (Current == Head) {
            break;
        }
    }
    return Count;
}
```

# main.c

> 노드 수의 2배 만큼 루프를 도는 부분을 자세히 한번 보세요

> 출력 결과를 보게 되면 환형 링크드 리스트이기 때문에 마지막 노드에서
> NextNode는 다시 첫 번째 노드가 됩니다.
```c
//
//  main.c
//  CDLL
//
//  Created by junmin chang on 2021/08/16.
//

#include <stdio.h>
#include "CircularDoublyLinkedList.h"
int main() {
    int i = 0;
    int Count = 0;
    Node* List = NULL;
    Node* NewNode = NULL;
    Node* Current = NULL;
    
    for (i=0; i<5; i++) {
        NewNode = CDLL_CreateNode(i);
        CDLL_AppendNode(&List, NewNode);
    }
    
    Count = CDLL_GetNodeCount(List);
    for (i=0; i<Count; i++) {
        Current = CDLL_GetNodeAt(List, i);
        printf("List[%d] : %d\n", i, Current->Data);
    }
    
    printf("300을 3번째 노드 뒤에 삽입\n");

    Current = CDLL_GetNodeAt(List, 2);
    NewNode = CDLL_CreateNode(300);
    CDLL_InsertAfter(Current, NewNode);
    
    // 노드 수의 2배만큼 루프를 돌려 환형임을 확인
    Count = CDLL_GetNodeCount(List);
    for (i=0; i<Count*2; i++) {
        if (i==0) {
            Current = List;
        } else {
            Current = Current->NextNode;
        }
        printf("List[%d] : %d\n", i, Current->Data);
    }
    printf("노드 제거\n");
    
    for (i=0; i<Count; i++) {
        Current = CDLL_GetNodeAt(List, 0);
        
        if (Current != NULL) {
            CDLL_RemoveNode(&List, Current);
            CDLL_DestroyNode(Current);
        }
    }
    
    return 0;
}
```

```bash
List[0] : 0
List[1] : 1
List[2] : 2
List[3] : 3
List[4] : 4
300을 3번째 노드 뒤에 삽입
List[0] : 0
List[1] : 1
List[2] : 2
List[3] : 300
List[4] : 3
List[5] : 4
List[6] : 0
List[7] : 1
List[8] : 2
List[9] : 300
List[10] : 3
List[11] : 4
노드 제거
Program ended with exit code: 0
```