---
title: 'Queue 예제'
date: '2021-08-24'
tag: 'data-structure'
---

# Header File

### LinkedQueue.h

```c
#ifndef LinkedQueue_h
#define LinkedQueue_h
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// 큐에 들어가게 될 노드의 구조체
typedef struct tagNode {
    char* Data;
    struct tagNode* NextNode;
} Node;

// 큐의 구조체
typedef struct tagLinkedQueue {
    // 전단
    Node* Front;
    // 후단
    Node* Rear;
    int Count;
} LinkedQueue;

void LQ_CreateQueue(LinkedQueue** Queue);
void LQ_DestroyQueue(LinkedQueue* Queue);

Node* LQ_CreateNode(char* NewData);
void LQ_DestroyNode(Node* _Node);
void LQ_Enqueue(LinkedQueue* Queue, Node* NewNode);
Node* LQ_Dequeue(LinkedQueue* Queue);

int LQ_IsEmpty(LinkedQueue* Queue);
#endif /* LinkedQueue_h */
```

# 구현

### LinkedQueue.c

```c
#include <stdio.h>
#include "LinkedQueue.h"

void LQ_CreateQueue(LinkedQueue** Queue) {
    // 큐를 Heap 영역에 생성
    (*Queue) = (LinkedQueue*)malloc(sizeof(LinkedQueue));
    // NULL로 초기화
    (*Queue)->Front = NULL;
    (*Queue)->Rear = NULL;
    (*Queue)->Count = 0;
}

void LQ_DestroyQueue(LinkedQueue* Queue) {
    // 큐에 들어있는 노드 다 제거
    while (!LQ_IsEmpty(Queue)) {
        Node* Popped = LQ_Dequeue(Queue);
        LQ_DestroyNode(Popped);
    }
    // 큐를 Heap 영역에서 해제
    free(Queue);
}

// char* 형으로 되어있지만 다른 자료형으로 하셔도 됩니당
Node* LQ_CreateNode(char* NewData) {
    Node* NewNode = (Node*)malloc(sizeof(Node));
    NewNode->Data = (char*)malloc(strlen(NewData + 1));
    
    // 데이터 저장
    strcpy(NewNode->Data, NewData);
    NewNode->NextNode = NULL;
    
    // 노드 주소 반환
    return NewNode;
}

void LQ_DestroyNode(Node* _Node) {
    // 노드 안에 데이터 힙에서 해제
    free(_Node->Data);
    // 노드 해제
    free(_Node);
}
// 삽입
void LQ_Enqueue(LinkedQueue* Queue, Node* NewNode) {
    // 큐에 아무것도 없다면
    if (Queue->Front == NULL) {
        Queue->Front = NewNode;
        Queue->Rear = NewNode;
        Queue->Count++;
    } else {
        // 후단의 다음 노드를 가리키는 포인터가
        // 새로운 노드를 가리키게 한다
        Queue->Rear->NextNode = NewNode;
        // 새로운 노드가 후단이 된다
        Queue->Rear = NewNode;
        Queue->Count++;
    }
}

Node* LQ_Dequeue(LinkedQueue* Queue) {
    // 현재 전단
    Node* Front = Queue->Front;
    // 전단 이후에 노드가 없다면
    if (Queue->Front->NextNode == NULL) {
        Queue->Front = NULL;
        Queue->Rear = NULL;
    } else {
        // 현재 전단의 다음 노드를 전단으로 한다
        Queue->Front = Queue->Front->NextNode;
    }
    Queue->Count--;
    
    // 이전 전단 반환
    return Front;
}

int LQ_IsEmpty(LinkedQueue* Queue) {
    return (Queue->Front == NULL);
}
```

# 프로그램 예제


### main.c
```c
#include <stdio.h>
#include "LinkedQueue.h"
int main() {
    Node* Popped;
    LinkedQueue* Queue;
    
    // 큐 생성
    LQ_CreateQueue(&Queue);
    
    // 큐에 노드 삽입
    LQ_Enqueue(Queue, LQ_CreateNode("abc"));
    LQ_Enqueue(Queue, LQ_CreateNode("def"));
    LQ_Enqueue(Queue, LQ_CreateNode("efg"));
    LQ_Enqueue(Queue, LQ_CreateNode("hij"));
    
    // 큐 사이즈 출력
    printf("Queue size: %d\n", Queue->Count);
    
    // 큐가 비워질 때 까지
    while (!LQ_IsEmpty(Queue)) {
        // Popped : 삭제된 노드
        Popped = LQ_Dequeue(Queue);
        printf("Dequeue: %s\n", Popped->Data);
        
        // 삭제된 노드를 메모리에서 해제
        LQ_DestroyNode(Popped);
    }
    // 큐를 메모리에서 해제
    LQ_DestroyQueue(Queue);
    
    return 0;
}
```