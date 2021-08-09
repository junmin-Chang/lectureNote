---
title: 'std::array'
date: '2021-08-09'
---
# std::array

---

## 기존 C스타일 배열의 문제점

* 메모리 할당, 해제를 수동으로 해야함. 해제하지 않으면 memory leak이 발생해 그 메모리 영역을 사용할 수 없게 됩니다.
* [] 연산자에서 배열 크기보다 큰 원소를 참조하지 못한다. 그렇게 할 경우 segmentation fault 발생
* 배열이 중첩될 경우 코드가 너무 복잡해짐

이러한 문제점을 피하기 위해 c++ 에서는 std::array를 사용합니다.


> std::array는 메모리를 자동으로 할당, 해제 합니다. std::array 는 원소의 타입과 배열 크기를 매개변수로 사용하는 클래스 템플릿 이다.

### Code
```cpp
std::array<int,10> arr1; // 크기가 10인 int 타입 배열 선언

arr1[0] = 1;
std::cout << "arr1 배열의 첫 번째 원소: " << arr[0] << std::endl;

std::array<int, 4> arr2 = {1,2,3,4};
std::cout << "arr2의 모든 원소: ";

for (int i = 0; i < arr2.size(); i++) {
    std::cout << arr2[i] >> " ";
} 
std::cout << std::endl;

```

### Output
> arr1 배열의 첫 번째 원소: 1


> arr2 배열의 모든 원소: 1 2 3 4


## 함수에 std::array 전달

---

기존 기본 데이터 타입을 전달하는 것과 유사합니다. 값 또는 reference 로 전달할 수 있고, C 스타일 배열을 사용할
때 처럼 함수에 전달할 때 포인터 연산을 사용하지 않아도 됩니다.

### Code

```cpp

void Print(std::array<int,5> arr) {
    for (auto ele : arr) {
        std::cout << ele << ", ";
    }
}

std::array<int,5> arr = {1,2,3,4,5};
Print(arr);


``` 