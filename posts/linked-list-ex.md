---
title: '링크드 리스트 구현'
date: '2021-08-15'
tag: 'data-structure'
---
## Header File (LinkedList.h)
```c
//
//  LinkedList.h
//  LinkedList
//
//  Created by junmin chang on 2021/08/15.
//

#ifndef LinkedList_h
#define LinkedList_h

typedef int ElementType;

typedef struct tagNode {
    ElementType Data;
    struct tagNode* NextNode;
} Node;

Node* SLL_CreateNode(ElementType NewData);
void SLL_DestroyNode(Node* Node);
void SLL_AppendNode(Node** Head, Node* NewNode);
void SLL_InsertAfter(Node* Current, Node* NewNode);
void SLL_InsertNewHead(Node** Head, Node* NewHead);
void SLL_RemoveNode(Node** Head, Node* Remove);
Node* SLL_GetNodeAt(Node* Head, int Location);
int SLL_GetNodeCount(Node* Head);


#endif /* LinkedList_h */
```

## 함수 구현 (LinkedList.c)

```c
//
//  LinkedList.c
//  LinkedList
//
//  Created by junmin chang on 2021/08/15.
//

#include "LinkedList.h"
#include <stdlib.h>

Node* SLL_CreateNode(ElementType NewData) {
    Node* NewNode = (Node*)malloc(sizeof(Node));
    
    NewNode->Data = NewData;
    NewNode->NextNode = NULL;
    
    return NewNode;
}

void SLL_DestroyNode(Node* Node) {
    free(Node);
}

void SLL_AppendNode(Node** Head, Node* NewNode) {
    if ((*Head) == NULL) {
        *Head = NewNode;
    } else {
        Node* Tail = (*Head);
        while (Tail->NextNode != NULL) {
            Tail = Tail->NextNode;
        }
        Tail->NextNode = NewNode;
    }
}

void SLL_InsertAfter(Node* Current, Node* NewNode) {
    NewNode->NextNode = Current->NextNode;
    Current->NextNode = NewNode;
}

void SLL_InsertNewHead(Node** Head, Node* NewHead) {
    if (*Head == NULL) {
        (*Head) = NewHead;
    } else {
        NewHead->NextNode = (*Head);
        (*Head) = NewHead;
    }
}

void SLL_RemoveNode(Node** Head, Node* Remove) {
    if (*Head == Remove) {
        *Head = Remove->NextNode;
    } else {
        Node* Current = *Head;
        while (Current != NULL && Current->NextNode != Remove) {
            Current = Current->NextNode;
        }
        if (Current != NULL) {
            Current->NextNode = Remove->NextNode;
        }
    }
}

Node* SLL_GetNodeAt(Node* Head, int Location) {
    Node* Current = Head;
    
    while (Current != NULL && (--Location) >= 0) {
        Current = Current->NextNode;
    }
    return Current;
}

int SLL_GetNodeCount(Node* Head) {
    int Count = 0;
    Node* Current = Head;
    
    while (Current != NULL) {
        Current = Current->NextNode;
        Count++;
    }
    return Count;
}
```

## main.c

```c
//
//  main.c
//  LinkedList
//
//  Created by junmin chang on 2021/08/15.
//

#include <stdio.h>
#include "LinkedList.h"

int main() {
    int i = 0;
    int Count = 0;
    Node* List = NULL;
    Node* Current = NULL;
    Node* NewNode = NULL;
    
    // 노드 5개 추가
    for (i=0; i<5; i++) {
        NewNode = SLL_CreateNode(i);
        SLL_AppendNode(&List, NewNode);
    }
    
    NewNode = SLL_CreateNode(-1);
    SLL_InsertNewHead(&List, NewNode);
    
    NewNode = SLL_CreateNode(-2);
    SLL_InsertNewHead(&List, NewNode);
    
    // 리스트 출력
    Count = SLL_GetNodeCount(List);
    for (i=0; i<Count; i++) {
        Current = SLL_GetNodeAt(List, i);
        printf("List[%d] : %d\n", i, Current->Data);
    }
    
    // 리스트의 3번째 노드 뒤에 새 노드 삽입
    Current = SLL_GetNodeAt(List, 2);
    NewNode = SLL_CreateNode(3000);
    
    SLL_InsertAfter(Current, NewNode);
    
    // 리스트 출력
    Count = SLL_GetNodeCount(List);
    for (i=0; i<Count; i++) {
        Current = SLL_GetNodeAt(List, i);
        printf("List[%d] : %d\n", i, Current->Data);
    }
    
    // 모든 노드를 메모리에서 해제
    printf("=====Destroy List=====");
    
    for (i=0; i<Count; i++) {
        Current = SLL_GetNodeAt(List, 0);
        
        if (Current != NULL) {
            SLL_RemoveNode(&List, Current);
            SLL_DestroyNode(Current);
        }
    }
    return 0;
}
```