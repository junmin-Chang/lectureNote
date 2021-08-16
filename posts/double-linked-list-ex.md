---
title: '더블 링크드 리스트 구현'
date: '2021-08-16'
tag: 'data-structure'
---

# Header File

### DoubleLinkedList.h

```c
//
//  DoublyLinkedList.h
//  Double-Linked-List
//
//  Created by junmin chang on 2021/08/16.
//

#ifndef DoublyLinkedList_h
#define DoublyLinkedList_h
#include <stdio.h>
#include <stdlib.h>

typedef int ElementType;

typedef struct tagNode {
    ElementType Data;
    struct tagNode* PrevNode;
    struct tagNode* NextNode;
} Node;

Node* DLL_CreateNode(ElementType NewData);
void DLL_DestroyNode(Node* Node);
void DLL_AppendNode(Node** Head, Node* NewNode);
void DLL_InsertAfter(Node* Current, Node* NewNode);
void DLL_RemoveNode(Node** Head, Node* Remove);
Node* DLL_GetNodeAt(Node* Head, int Location);
int DLL_GetNodeCount(Node* Head);

#endif /* DoublyLinkedList_h */

```

# 함수 구현

### DoubleLinkedList.c

```c
//
//  DoublyLinkedList.c
//  Double-Linked-List
//
//  Created by junmin chang on 2021/08/16.
//

#include "DoublyLinkedList.h"
#include <stdio.h>

Node* DLL_CreateNode(ElementType NewData) {
    Node* NewNode = (Node*)malloc(sizeof(Node));
    
    NewNode->Data = NewData;
    NewNode->PrevNode = NULL;
    NewNode->NextNode = NULL;

    return NewNode;
}

void DLL_DestroyNode(Node* Node) {
    free(Node);
}

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

void DLL_InsertAfter(Node* Current, Node* NewNode) {
    NewNode->NextNode = Current->NextNode;
    NewNode->PrevNode = Current;
    
    if (Current->NextNode != NULL) {
        Current->NextNode->PrevNode = NewNode;
    }
    Current->NextNode = NewNode;
}

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

Node* DLL_GetNodeAt(Node* Head, int Location) {
    Node* Current = Head;
    
    while(Current != NULL && (--Location) >= 0) {
        Current = Current->NextNode;
    }
    
    return Current;
}

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

# 예제 프로그램

### main.c

```c
//
//  main.c
//  Double-Linked-List
//
//  Created by junmin chang on 2021/08/15.
//

#include <stdio.h>
#include "DoublyLinkedList.h"
int main() {
    int i = 0;
    int Count = 0;
    Node* List = NULL;
    Node* NewNode = NULL;
    Node* Current = NULL;
    
    // 노드 5개 추가
    for (i=0; i<5; i++) {
        NewNode = DLL_CreateNode(i);
        DLL_AppendNode(&List, NewNode);
    }
    
    // 출력
    Count = DLL_GetNodeCount(List);
    for (i=0; i<Count; i++) {
        Current = DLL_GetNodeAt(List, i);
        printf("List[%d] : %d\n", i, Current->Data);
    }
    
    // 리스트 3번째 칸 뒤에 노드 삽입
    Current = DLL_GetNodeAt(List, 2);
    NewNode = DLL_CreateNode(3000);
    DLL_InsertAfter(Current, NewNode);
    
    // 출력
    Count = DLL_GetNodeCount(List);
    for (i=0; i<Count; i++) {
        Current = DLL_GetNodeAt(List, i);
        printf("List[%d] : %d\n", i, Current->Data);
    }
    
    // 메모리에서 제거
    Count = DLL_GetNodeCount(List);
    for (i=0; i<Count; i++) {
        Current = DLL_GetNodeAt(List, 0);
        
        if (Current != NULL) {
            DLL_RemoveNode(&List, Current);
            DLL_DestroyNode(Current);
        }
    }
    return 0;
}
```