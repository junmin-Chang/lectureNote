---
title: 'Queue(큐)'
date: '2021-08-24'
tag: 'data-structure'
---

# 개요

![images](https://diginomica.com/sites/default/files/images/2014-06/line-of-people.jpg)

> 놀이동산에서 사람들이 기구를 타려고 줄을 서고 있습니다. 이번 포스트에서 다룰 **큐** 가 사람들이 서있는
> 줄과 비슷한데요.

선입 선출 혹은 First In, First Out 의 자료구조를 우리는 **큐** 라고 부릅니다. 혹시 롤 이라는 게임을 아시나요?
**큐를 돌린다** 라고들 하는데요, 게임의 큐는 대기열을 말합니다. 먼저 큐를 돌린 사람이 게임에 먼저 참여할 수 있겠죠?

스택이 First In, Last Out 인 반면에 큐는 First In, First Out 입니다. 그래서 줄에 비유할 수 있는거죠.
먼저 줄을 서는 사람이 먼저 나갈테니까요.

# 주요 기능 (큐)

![images](https://www.javascripttutorial.net/wp-content/uploads/2016/08/JavaScript-Queue-Illustration.png)

> 스택은 데이터의 삽입과 제거가 최상위 노드(top)에서 이루어졌습니다. 하지만 큐는 삽입은 뒷부분(후단)
> 제거는 앞부분(전단)에서 이루어집니다.

줄을 서려면 뒤에서부터(후단) 들어가야겠죠?(삽입) 반대로 줄에서 빠져나가는 것은 앞에서(전단) 나갑니다(제거)

- 삽입(Enqueue)은 후단에 새로운 노드를 붙여서 새로운 후단을 만드는 연산입니다.
- 제거(Dequeue)는 전단의 노드를 없애서 그 뒤에 있는 노드를 새로운 전단으로 만드는 연산입니다.

### 배열을 통해서 큐를 구현한다고 생각해봅시다.
![images](https://www.cs.usfca.edu/~srollins/courses/cs112-f08/web/notes/queues/queues4.gif)

> 전단의 1을 제거하게 되면 뒤의 요소들을 앞으로 땡겨야 되겠죠? 하지만 배열의 요소가 100개가 있다고
> 생각해봅시다. 하나를 제거하면 나머지 99개의 요소들을 다 앞으로 한칸 씩 땡겨야 합니다.

### 성능이 구려집니다. 비용이 많이 들어요

# 링크드 큐

![images](https://static.javatpoint.com/ds/images/linked-list-implementation-of-queue.png)

>링크드 리스트와 매우 유사합니다. 삽입은 어떻게 하면 될까요? 후단의 노드의 포인터를 새로운 노드가 가리키게끔 
> 하면 되겠죠? 제거는 전단 이후의 노드에서 전단에 대한 포인터를 거두면 됩니다.

### 링크드 큐 구조체
```c
//링크드 큐 구조체
typedef struct tagLinkedQueue {
    Node* Front; //전단
    Node* Rear; // 후단
    int Count; // 노드 개수
} LinkedQueue;
```

### 삽입 연산(Enqueue)
> 후단에 새로운 노드 붙이기. 끝

```c
void LQ_Enqueue(LinkedQueue* Queue, Node* NewNode) {
    if (Queue->Front == NULL) {
        Queue->Front = NewNode;
        Queue->Rear = NewNode;
        Queue->Count++;
    } else {
        Queue->Rear->NextNode = NewNode;
        Queue->Rear = NewNode;
        Queue->Count++;
    }
}
```

### 제거 연산(Dequeue)
> 전단 바로 뒤 노드를 새로운 전단으로. 끝

```c
void LQ_Dequeue(LinkedQueue* Queue) {
    // 현재 전단
    Node* Front = Queue->Front;
    if (Queue->Front->NextNode == NULL) {
        Queue->Front = NULL;
        Queue->Rear = NULL
    } else {
        Queue->Front = Queue->Front->NextNode;
    }
    Queue->Count--;
    
    // 전단이었던 포인터 반환
    return Front;
}
```