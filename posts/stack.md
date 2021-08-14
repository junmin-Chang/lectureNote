---
title: '스택(Stack)'
date: '2021-08-11'
tag: 'data-structure'

---

# 스택이란?
> 말의 의미를 한번 생각해보자. Stack 즉 무더기로 쌓여있는 것이다. 이미지를 한번 보자.

![image](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/300px-Data_stack.svg.png)

이미지에서 보이는 쌓여있는 것들을 종합해서 스택이라고 말합니다. 각각의 파란색 박스는 자료이고
자료구조의 일종인 스택의 맨 윗부분
에서만 자료가 들어오고 나가는 것을 볼 수 있습니다.

이렇게 스택은 한 쪽 끝에서만 자료를 넣고 뺄 수 있는
LIFO(Last in, First Out) 구조로 되어있습니다.

LIFO(Last In First Out) 라는 말의 의미를 한번 생각해 봅시다. Last in, 즉 마지막으로 들어온 자료가 First out,
가장 먼저 나간다. 인데 이미지를 보고 그 의미를 쉽게 알 수 있습니다.

> 스택은 한쪽 끝에서만 데이터를 삽입하거나 삭제할 수 있으며, 한쪽 끝이 아닌 위치에 있는 데이터는 접근하거나 변경할 수 없습니다.

> 하지만 벡터(vector)나 덱(deque)는 이러한 기능을 기본 제공하므로, 스택을 구현하기 위해 사용할 수 있습니다. 


- push: 스택에 데이터 추가
- pop: 스택의 데이터 삭제
## code(c++) 스택 구현 방법
```cpp
std::deque<int> stk1;
stk1.push_back(1); // 스택에 1 추가 {1} 맨 아래에 있음
stk1.push_back(2); // 스택에 2 추가 {1,2} 1 위에 2가 있음
stk1.pop_back(); // 스택에서 맨 위 원소 제거 => {1}

std::stack<int> stk2;
stk2.push(1); // 스택에 1 추가 {1}
stk2.push(2); // 스택에 2 추가 {1,2}
stk2.pop(); // 스택에서 맨 위 원소 제거 {1}
```
