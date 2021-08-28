---
title: '트리 개요'
date: '2021-08-29'
tag: 'data-structure'
---

# 개요

![images](https://media.geeksforgeeks.org/wp-content/cdn-uploads/binary-tree-to-DLL.png)

> 트리는 굉장히 **중요한** 자료구조 입니다. 이름에서부터 알 수 있듯이 나무를 닮은 자료구조 랍니다.
> 나무에는 뿌리가 있고, 가지가 있고, 잎이 있죠? 이런 요소들이 트리 자료구조에도 존재합니다.


# 트리 구성 요소

트리는 크게 세 가지 요소로 이루어져 있습니다.
세 요소 모두 노드 인 것은 같습니다. 하지만 트리안에서 어떤 위치에 있느냐에 따라 노드의 명칭이 달라지는데요,


- 뿌리 (Root)
  - 우선 이미지를 보시면 1 이라는 노드가 보이시죠? 1에서 부터 뻗어져 나오므로 우린 이것을 뿌리(root) 라고 부르기로 했어요. 가장 최상위에 있는
노드가 되겠죠.
- 가지(Branch)
  - 뿌리와 잎 사이의 모든 노드를 가지(branch) 라고 합니다.
- 잎 (Leaf)
  - 그리고 가지 끝에 매달려있는 즉, 가장 끝에 있는 노드는 잎(leaf) 노드라고 부릅니다. 전공책에는 Terminal Node라고
    되어있을지도 모르겠습니다.

# 용어

> 트리는 부모와 자식 관계를 이루고 있습니다. 노드 1에서 2와 3 노드가 뻗어져 나오죠?
> 그렇다면 1이 부모 노드이고 2, 3이 자식노드가 됩니다. 그렇다면 노드 4는 어떤 노드의 자식 노드이고 부모 노드 일까요?

### 경로

- 경로는 한 노드에서 다른 노드까지의 길 사이에 있는 노드들의 순서 입니다. 노드 1에서 노드 4까지의 경로는 ?
1 -> 2 -> 4
  - 길이: 경로는 길이라는 속성을 가집니다. 길이는 출발 노드에서 도착 노드까지 거쳐야 하는 노드의 개수를 말합니다.
    노드 1에서 노드 4까지의 길이는 2가 되겠죠.
    
### 깊이(Depth)

- 깊이는 뿌리 노드에서 특정 노드까지의 경로의 길이를 말합니다.
  - 길이와는 다르게 뿌리 노드를 기준으로 삼습니다. 뿌리 Depth = 0
    
### 레벨(Level)

- 레벨은 깊이가 같은 노드의 집합을 말합니다. 이미지로 예를 들자면 레벨 1은 노드 2, 3의 집합을 말합니다.

### 높이(Height)

- 높이는 가장 큰 Depth 값을 가진 노드까지의 깊이를 말합니다. 이미지로 예를 들자면 이 트리의 높이는 3이 됩니다.


# 노드 표현

> 트리의 노드를 표현하는 방법에는 두 가지가 있습니다. 하나는 N-link 표현법이고, 하나는 LCRS(Left Child Right Sibling) 표현법 이라고 합니다.

![images](https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmKv1j%2FbtqDzEfragV%2Fj9FgmQwi4dRRMtjD2DFCok%2Fimg.png)


LCRS 표현법을 살펴보자면, 링크드 리스트의 노드에는 데이터와 포인터로 이루어져 있었죠? LCRS 표현법은
두개의 포인터를 가지고 있습니다. 왼쪽의 Left child 포인터는 자식 노드를 가리키고, Right Sibling 포인터
는 형제 노드를 가리킵니다.

어느 한 노드의 모든 자식 노드를 얻으려면 우선 왼쪽 자식 노드에 대한 포인터를 이용합니다. 왼쪽 자식 노드 
포인터를 이용해서 왼쪽 자식 노드의 주소를 얻은 후에, 이 자식노드의 오른쪽 형제 노드의 주소를 얻고 또 오른쪽 형제 노드 주소를 얻고,,
를 NULL이 나타날 때 까지 반복하면 모든 자식 노드를 얻을 수 있겠죠?

이해가 안가더라도 코드를 한번 보면서 이해해 봅시다.

# 트리 구현

### Header File

```c
#ifndef LCRSTree_h
#define LCRSTree_h

#include <stdio.h>
#include <stdlib.h>

typedef char ElementType;

// 노드 구조체 정의
typedef struct tagLCRSNode {
    // 왼쪽 자식 포인터
    struct tagLCRSNode* LeftChild;
    // 오른쪽 형제 포인터
    struct tagLCRSNode* RightSibling;
    
    // 데이터
    ElementType Data;
} LCRSNode;

LCRSNode* LCRS_CreateNode(ElementType NewData);
void LCRS_DestroyNode(LCRSNode* Node);
void LCRS_AddChildNode(LCRSNode* ParentNode, LCRSNode *ChildNode);
void LCRS_PrintTree(LCRSNode* Node, int Depth);

#endif /* LCRSTree_h */
```

### 구현

```c
//
//  LCRSTree.c
//  tree
//
//  Created by junmin chang on 2021/08/29.
//

#include <stdio.h>
#include "LCRSTree.h"

LCRSNode* LCRS_CreateNode(ElementType NewData) {
    LCRSNode* NewNode = (LCRSNode*)malloc(sizeof(LCRSNode));
    // 포인터 NULL로 (노드 추가 전이므로)
    NewNode->LeftChild = NULL;
    NewNode->RightSibling = NULL;
    NewNode->Data = NewData;
    return NewNode;
}

void LCRS_DestroyNode(LCRSNode* Node) {
    // 메모리에서 해제
    free(Node);
}

void LCRS_DestroyTree(LCRSNode* Root) {
    if (Root->RightSibling != NULL) {
        LCRS_DestroyNode(Root->RightSibling);
    }
    if (Root->LeftChild != NULL) {
        LCRS_DestroyNode(Root->LeftChild);
    }
    Root->LeftChild = NULL;
    Root->RightSibling = NULL;
    
    LCRS_DestroyNode(Root);
}

void LCRS_AddChildNode(LCRSNode* Parent, LCRSNode *Child) {
    // 부모 노드에 자식 노드가 없는 상태라면
    if (Parent->LeftChild == NULL) {
        //  새로 추가할 Child 노드를 바로 연결 
        Parent->LeftChild = Child;
    } else {
        // 자식 노드가 있다면,
        LCRSNode* TmpNode = Parent->LeftChild;
        while (TmpNode->RightSibling != NULL) {
            // 그 자식 노드의 마지막 형제 노드까지 이동 후,
            TmpNode = TmpNode->RightSibling;
        }
        // 마지막 형제노드의 오른쪽 형제 노드 포인터가 새로운 자식을 가리키게 한다.
        TmpNode->RightSibling = Child;
    }
}

void LCRS_PrintTree(LCRSNode* Node, int Depth) {
    int i = 0;
    for (i=0; i<Depth; i++) {
        printf(" ");
    }
    printf("%c\n", Node->Data);
    
    if (Node->LeftChild != NULL) {
        LCRS_PrintTree(Node->LeftChild, Depth + 1);
    }
    if (Node->RightSibling != NULL) {
        LCRS_PrintTree(Node->RightSibling, Depth);
    }
}
```

### main.c

```c
//
//  main.c
//  tree
//
//  Created by junmin chang on 2021/08/29.
//

#include <stdio.h>
#include "LCRSTree.h"

int main() {
    LCRSNode* Root = LCRS_CreateNode('A');
    
    LCRSNode* B = LCRS_CreateNode('B');
    LCRSNode* C = LCRS_CreateNode('C');
    LCRSNode* D = LCRS_CreateNode('D');
    LCRSNode* E = LCRS_CreateNode('E');
    LCRSNode* F = LCRS_CreateNode('F');
    LCRSNode* G = LCRS_CreateNode('G');
    LCRSNode* H = LCRS_CreateNode('H');
    LCRSNode* I = LCRS_CreateNode('I');
    LCRSNode* J = LCRS_CreateNode('J');
    LCRSNode* K = LCRS_CreateNode('K');

    LCRS_AddChildNode(Root, B);
    LCRS_AddChildNode(B, C);
    LCRS_AddChildNode(B, D);
    LCRS_AddChildNode(D, E);
    LCRS_AddChildNode(D, F);
    LCRS_AddChildNode(Root, G);
    LCRS_AddChildNode(G, H);
    LCRS_AddChildNode(Root, I);
    LCRS_AddChildNode(I, J);
    LCRS_AddChildNode(J, K);
    
    LCRS_PrintTree(Root, 0);
    
    LCRS_DestroyNode(Root);
    
    return 0;
}
```

> 출력을 해보시면 이런 결과가 나타날 텐데요

```bash
A
 B
  C
  D
   E
   F
 G
  H
 I
  J
   K
Program ended with exit code: 0
```

A에서 한칸 밀린 B는 A의 자식 노드라는 뜻이고, B에서 한칸 밀려 출력된 C는 B의 자식 노드라는 뜻입니다.

어디서 많이 본 것 같지 않나요? 윈도우의 파일 탐색기에 가보시면 폴더 구조가 이렇게 되어있습니다.

![images](https://tarma.com/support/im9/img/FolderTree_normal.png)

트리 자료구조는 이처럼 가까운 곳에 존재합니다. 