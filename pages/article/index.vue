<template>
  <v-app>
    <!--顶部标题栏-->
    <app-common-bar></app-common-bar>

    <v-main class="article-container">
      <v-container>
        <div class="artcle-likes-bar">
          <div>
            <v-col>
              <v-badge
                overlap
                :color="likesFlag.thumbUp ? '#1e80ff' : '#c2c8d1'"
                :content="likesNum"
                :value="likesNum"
              >
                <v-btn elevation="2" fab rounded middle icon @click="this.handleLikeIconClick">
                  <v-icon :color="likesFlag.thumbUp ? '#1e80ff' : '#8a919f'"
                    >mdi-thumb-up</v-icon
                  >
                </v-btn>
              </v-badge>
            </v-col>
            <v-col>
              <v-badge
                overlap
                :color="likesFlag.comment ? '#1e80ff' : '#c2c8d1'"
                :content="commentNum"
                :value="commentNum"
              >
                <v-btn elevation="2" fab rounded middle>
                  <v-icon :color="likesFlag.comment ? '#1e80ff' : '#8a919f'"
                    >mdi-comment</v-icon
                  >
                </v-btn>
              </v-badge>
            </v-col>
            <v-col>
              <v-badge
                overlap
                :color="likesFlag.star ? '#1e80ff' : '#c2c8d1'"
                :content="starNum"
                :value="starNum"
              >
                <v-btn elevation="2" fab rounded middle>
                  <v-icon :color="likesFlag.star ? '#1e80ff' : '#8a919f'"
                    >mdi-star</v-icon
                  >
                </v-btn>
              </v-badge>
            </v-col>
            <v-col>
              <v-btn elevation="2" fab rounded middle>
                <v-icon color="#8a919f">mdi-share</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" fab rounded middle>
                <v-icon color="#8a919f">mdi-alert</v-icon>
              </v-btn>
            </v-col>
          </div>
        </div>
        <v-row class="article-row">
          <v-col cols="9">
            <v-card elevation="0">
              <!--文章详情主体-->
              <div class="article-content-box">
                <!--文章标题-->
                <v-row>
                  <input v-model="title" placeholder="请输入标题" />
                </v-row>
                <!--作者信息-->
                <v-row>
                  <div class="author">
                    <v-col
                      class="author-img"
                      cols="1"
                      style="display: inline-block"
                    >
                      <v-img
                        :src="`https://picsum.photos/500/300?image=15`"
                        :lazy-src="`https://picsum.photos/10/6?image=15`"
                        :min-width="43"
                        :max-width="43"
                        :max-height="43"
                        :min-height="43"
                        aspect-ratio="1"
                        class="grey lighten-2"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                    <v-col cols="10" style="display: inline-block">
                      <v-row>
                        <span class="author-name">{{ authorName }}</span>
                      </v-row>
                      <v-row>
                        <span class="publish-time">
                          {{ publishTime | formatDates('YYYY-MM-dd HH:mm') }}
                        </span>
                        <span class="page-views">
                          &nbsp;&nbsp;·&nbsp;&nbsp;阅读
                          <span>{{ pageViews }}</span>
                        </span>
                      </v-row>
                    </v-col>
                  </div>
                </v-row>
                <!--文章详情主体-->
                <v-row>
                  <app-common-markdown-previewer :content="content" />
                </v-row>
              </div>
            </v-card>
          </v-col>
          <v-col cols="2">
            <v-card> 右侧栏 </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppCommonBar from '~/components/AppCommonBar'
import AppCommonMarkdownPreviewer from '~/components/AppCommonMarkdownPreviewer.vue'

export default {
  name: 'ArticleDetailsView',
  components: {
    AppCommonBar,
    AppCommonMarkdownPreviewer,
  },
  data: () => ({
    pageViews: 0,
    authorName: '',
    publishTime: '',
    title: '',
    content: '',
    likesNum: 1,
    starNum: 0,
    commentNum: 0,
    likesFlag: {
      thumbUp: false,
      comment: false,
      star: false,
    },
  }),
  methods: {
    handleLikeIconClick(){
       this.likesFlag.thumbUp = !this.likesFlag.thumbUp
    },

  },
  beforeMount() {
    this.content =
      '## Java 流式编程（Stream API）\n' +
      '\n' +
      '\n' +
      '\n' +
      '### 1. 什么是流式编程\n' +
      '\n' +
      '对于java来说，我们最常用的面向对象编程属于命令式编程（Imperative Programming）这种编程范式。常见的编程范式还有`逻辑式编程（Logic Programming）`，`函数式编程（Functional Programming）`。java8也引入了函数式编程，结合 **Lambda 表达式**，对于函数式接口的实现和使用变得灵活和简洁了。关于函数式接口以及Lambda表达式，今天不做详细的分享和学习，今天的重点是`流式编程`。流式编程是一个受到 函数式编程 和 多核时代影响而产生的东西。其实，**流式编程就是基于JDK8 的Stream对于集合一系列的操作的流程定义**。\n' +
      '\n' +
      '### 2. 什么是流\n' +
      '\n' +
      'JDK起名字还是很形象的，为什么叫流呢？他不是一个数据结构，只是一个**高级的迭代或者遍历**，他就像是个管道，去处理水流一样，只能处理一次，但是，处理完之后，可以把处理的水装起来，继续处理，或者直接拿走处理后你所需要的。**它内部对集合的处理采用了fork/join模式**（JDK1.7加入的，针对并发处理的框架），这个也广泛应用于多线程和算法中，有兴趣的可以了解一下。\n' +
      '\n' +
      '### 3. 常用的流操作\n' +
      '\n' +
      '流主要针对集合相关的操作，所有继承自Collection的接口都可以使用流，`default Stream<E> stream() { return StreamSupport.stream(spliterator(), false); }` 而stream也是一个接口，最后都是在ReferencePipeline这个类中实现的，我们先截取一下所有的方法：\n' +
      '\n' +
      '![](https://image.easyblog.top/%E6%88%AA%E5%B1%8F2021-07-19%20%E4%B8%8B%E5%8D%883.09.36.png)\n' +
      '\n' +
      '方法还是很多的，按照我们之前说的，根据操作返回结果不同，我们大致进行一下分类，也就是返回stream的就是中间操作，其他的，返回具体对象的就是最终操作：\n' +
      '**中间操作**：\n' +
      '\n' +
      '* `filter()`： 对元素进行过滤\n' +
      '* `sorted()`：对元素排序\n' +
      '* `map()`：元素映射\n' +
      '* `distinct()`：去除重复的元素\n' +
      '\n' +
      '**最终操作**：\n' +
      '\n' +
      '* `forEach()`：遍历每个元素。\n' +
      '* `findFirst()`：找第一个符合要求的元素。\n' +
      '* `reduce()`：把Stream 元素组合起来。例如，字符串拼接，数值的 sum，min，max ，average 都是特殊的 reduce。\n' +
      '* `collect()`：返回一个新的数据结构，基于Collectors有丰富的处理方法。\n' +
      '* `min()`：找到最小值。\n' +
      '* `max()`：找到最大值。\n' +
      '  需要注意的是，一般中间操作之后，都是为了进行最终操作，得到我们需要的对象。\n' +
      '\n' +
      '\n' +
      '\n' +
      '### 4. Stream的生成操作\n' +
      '\n' +
      '#### 4.1 通过数组生成Stream\n' +
      '\n' +
      'Java 8提供了两种将数组转换成Stream的方式：`Arrays.stream()` 和 `Stream.of()` 。下面是一个示例。\n' +
      '\n' +
      '```java\n' +
      'public class StreamTest {\n' +
      '\n' +
      '    static void gen1(){\n' +
      '        String[] strings= UUID.randomUUID().toString().split("-");\n' +
      '\n' +
      '        //使用 Arrays.stream\n' +
      '        Stream<String> stream1 = Arrays.stream(strings);\n' +
      '        stream1.forEach(System.out::println);\n' +
      '\n' +
      '        //使用 Stream.of\n' +
      '        Stream<String> stream2= Stream.of(strings);\n' +
      '        stream2.forEach(System.out::println);\n' +
      '    }\n' +
      '\n' +
      '\n' +
      '    public static void main(String[] args) {\n' +
      '        gen1();\n' +
      '    }\n' +
      '\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '\n' +
      '\n' +
      '#### 4.2 通过集合生成Stream\n' +
      '\n' +
      '将集合转化成Stream然后对集合数据进行处理的场景的应该是我们日常开发中使用最多的用法了，对此Java 8也提供了一个方法：`stream()` ，只需要使用集合对象调用stream()方法就可以很轻松的将一个集合转换成流。下面是一个示例。\n' +
      '\n' +
      '```java\n' +
      'public class StreamTest {\n' +
      '\n' +
      '    static  void gen2(){\n' +
      '        //List集合\n' +
      '        List<Integer> lists= Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n' +
      '        Stream<Integer> stream1 = lists.stream();\n' +
      '        stream.forEach(System.out::println);\n' +
      '      \n' +
      '        //Set集合\n' +
      '        Set<Integer> set=new HashSet();\n' +
      '        set.add(1);\n' +
      '        set.add(2);\n' +
      '        Stream<Integer> stream2=set.stream();\n' +
      '        stream2.forEach(System.out::println)\n' +
      '          \n' +
      '        //Map 不能直接.stream() 获取它对应的Stream，需要获取它的entrySet之后再操作\n' +
      '         Map<Integer,Integer> map=new HashMap<>();\n' +
      '         map.put(1,1000);\n' +
      '         map.put(2,1001);\n' +
      '         map.put(3,1002);\n' +
      '         Stream<Map.Entry<Integer,Integer>> stream3=map.entrySet().stream();\n' +
      '         stream3.forEach(System.out::println);\n' +
      '    }\n' +
      '\n' +
      '\n' +
      '    public static void main(String[] args) {\n' +
      '        gen2();\n' +
      '    }\n' +
      '\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '\n' +
      '\n' +
      '#### 4.3 通过API  `generate` 生成Stream\n' +
      '\n' +
      'Stream接口中提供了一个静态API 方法 `generate(Supplier<T> s)`  ,该方法需要提供一个Supplier类型的参数，然后`generate` 方法就可以根据提供的Supplier自动生成一些常量Stream或随机数Stream等。**注意**：使用这个方法的时候一般需要配合`limit(int max)`对生成的数量进行限制。下面是一个示例。\n' +
      '\n' +
      '```java\n' +
      'public class StreamTest {\n' +
      '\n' +
      '    //生成10个随机数组成的Stream\n' +
      '    static void gen3(){\n' +
      '        Stream<Integer> randomIntegerStream = Stream.generate(() -> (int) (Math.random() * 100));\n' +
      '        randomIntegerStream.limit(10).forEach(System.out::println);\n' +
      '    }\n' +
      '\n' +
      '    public static void main(String[] args) {\n' +
      '        gen3();\n' +
      '    }\n' +
      '\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '\n' +
      '\n' +
      '#### 4.4 通过API  `iterate` 生成Stream\n' +
      '\n' +
      '使用`generate(Supplier<T> s)`不容易生成像1~10这样连续数的Steam，但是使用Stream提供的另一个静态方法`iterate(final T seed, final UnaryOperator<T> f) ` 就可以很容易的生成。**注意**：同样的，使用这个方法的时候一般也需要配合`limit(int max)`对生成的数量进行限制。下面是一个示例。\n' +
      '\n' +
      '```java\n' +
      'public class StreamTest {\n' +
      '\n' +
      '    //生成1~10连续数组成的Stream\n' +
      '    static void gen4(){\n' +
      '        Stream<Integer> integerStream = Stream.iterate(1, x -> x + 1);\n' +
      '        integerStream.limit(10).forEach(System.out::println);\n' +
      '    }\n' +
      '\n' +
      '    public static void main(String[] args) {\n' +
      '        gen4();\n' +
      '    }\n' +
      '\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '\n' +
      '\n' +
      '### 5. Stream 的中间操作\n' +
      '\n' +
      '#### 5.1. filter过滤操作\n' +
      '\n' +
      '这个方法应该是用的最多的，也是最重要的一个方法。\n' +
      '\n' +
      '`Stream<T> filter(Predicate<? super T> predicate)` 是其方法定义，filter方法接收一个`Predicate`类型参数用于对目标集合进行过滤，Predicate是一个函数式接口，是Java8内置的四大基础函数式接口之一。Predicate接口的定义如下图所示。\n' +
      '\n' +
      '![](https://image.easyblog.top/%E6%88%AA%E5%B1%8F2021-07-19%20%E4%B8%8B%E5%8D%883.21.16-6765863.png)\n' +
      '\n' +
      '`@FunctionalInterface`表示`Predicate`是一个**函数式接口**，我们可以直接用Lambda表达式进行实现。`filter`方法最总还是一个Stream，我们可以继续对它进行相关操作。\n' +
      '\n' +
      '**Demo1**\n' +
      '\n' +
      '对一个list集合进行过滤，获取其中大于5并且是偶数的所有数字。\n' +
      '\n' +
      '```java\n' +
      'public static void main(String[] args) {                     \n' +
      '    List<Integer> lists= Arrays.asList(1,2,3,4,5,6,7,8,9,10);\n' +
      '    //使用filter过滤原始集合中大于5并且是偶数的数字                             \n' +
      '    List<Integer> collect = lists.stream().filter(num ->     \n' +
      '            num > 5 & num % 2 == 0                           \n' +
      '    ).collect(Collectors.toList());                          \n' +
      '    collect.forEach(System.out::println);                    \n' +
      '} \n' +
      '```\n' +
      '\n' +
      '总结一下实现步骤：\n' +
      '\n' +
      '* 第1步：通过集合对象调用`stream` 或 `parallelStream` 方法，后者适用于待处理数据量非常巨大并且代码运行在多核服务器上的场景。\n' +
      '* 第2步：调用filter方法，使用Lambda表达式生成了一个Predicate的实现类，其中`num`是入参，是一个Integer的数据类型，和流中的数据元对应，后面是Predicate的test方法的方法体，这里是过滤掉的集合中的哪些元素；\n' +
      '* 第3步：使用`collect`方法把过滤后的元素转换为一个新的集合。\n' +
      '\n' +
      '**小试牛刀**\n' +
      '\n' +
      '对一个包含key是用户ID，value是用户生日的Map进行过滤，挑选中其中生日是今天的用户。\n' +
      '\n' +
      '```java\n' +
      ' public static void main(String[] args) {                                                                                                                        \n' +
      '     Map<Integer, LocalDate> userBirthMap = new HashMap<Integer, LocalDate>() {{              \n' +
      '         put(1, LocalDate.of(1998, 12, 30));                                                  \n' +
      '         put(2, LocalDate.of(1997, 10, 3));                                                   \n' +
      '         put(3, LocalDate.of(1998, 11, 7));                                                   \n' +
      '         put(4, LocalDate.of(1992, 7, 19));                                                   \n' +
      '         put(5, LocalDate.of(1990, 7, 19));                                                   \n' +
      '         put(6, LocalDate.of(2000, 7, 19));                                                   \n' +
      '         put(7, LocalDate.of(1996, 5, 30));                                                   \n' +
      '         put(8, LocalDate.of(1995, 7, 1));                                                    \n' +
      '         put(9, LocalDate.of(1998, 7, 19));                                                   \n' +
      '         put(10, LocalDate.of(1993, 7, 19));                                                  \n' +
      '     }};                                                                                      \n' +
      '                                                                                              \n' +
      '     Map<Integer, LocalDate> collect = userBirthMap.entrySet().stream().filter(userInfo -> { \n' +
      '         //这里其实就是Predict test方法的方法体                                                           \n' +
      '         LocalDate now = LocalDate.now();                                                     \n' +
      '         LocalDate birth = userInfo.getValue();                                               \n' +
      '         if (Objects.nonNull(birth)) {                                                        \n' +
      '             return birth.getMonth() == now.getMonth() &&                                     \n' +
      '                     birth.getDayOfMonth() == now.getDayOfMonth();                            \n' +
      '         }                                                                                    \n' +
      '         return false;                                                                        \n' +
      '     }).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));                    \n' +
      '                                                                                              \n' +
      '     collect.forEach((key,value)->{                                                          \n' +
      '         System.out.println(key+" "+value);                                                   \n' +
      '     });                                                                                      \n' +
      ' }                                                                                            \n' +
      '```\n' +
      '\n' +
      '\n' +
      '\n' +
      '#### 5.2 sorted排序\n' +
      '\n' +
      '之前的排序，基本都是new一个Comparator，重写其compare方法，还是很麻烦的，Stream中提供了针对排序的方法，`Stream<T> sorted(Comparator<? super T> comparator);` 传入的是一个`Comparator`的实现类，大家可能也想到了，Comparator也是一个函数式接口，里面就一个抽象方法`int compare(T o1, T o2);` 调用这个方法，一般都是比较对象的某个属性，这个时候可以用Lambda表达式的方法应用写法，这里的排序都是自然顺序，也就是正序的，想要倒序，调用reversed方法就ok。\n' +
      '\n' +
      '**Demo2**\n' +
      '\n' +
      '又一个学生类Student列表，包括学生姓名name，学生数学成绩mathScore,学生英语成绩englishScore，现在要求对这个列表按照一下规则排序：\n' +
      '\n' +
      '* （1）优先按照学生数学成绩排序\n' +
      '* （2）数学成绩相同的按照英语成绩排序\n' +
      '\n' +
      '```java\n' +
      ' public static void main(String[] args) {                                                               \n' +
      '     ArrayList<Student> students = new ArrayList<Student>() {{                                          \n' +
      '         add(new Student("张三",89,86));                                                                  \n' +
      '         add(new Student("李四",78,100));                                                                 \n' +
      '         add(new Student("王武",90,89));                                                                  \n' +
      '         add(new Student("王富贵",100,34));                                                                \n' +
      '         add(new Student("来福",90,87));                                                                  \n' +
      '         add(new Student("狗蛋",100,89));                                                                 \n' +
      '     }};                                                                                                \n' +
      '                                                                                                        \n' +
      '     //默认是顺序排列，这需要倒序                                                                                    \n' +
      '     List<Student> collect = students.stream().sorted(Comparator.comparing(Student::getMathScore)       \n' +
      '             .thenComparing(Student::getEnglishScore).reversed()).collect(Collectors.toList());         \n' +
      '                                                                                                        \n' +
      '     collect.forEach(student -> {                                                                       \n' +
      '         System.out.println(student.getName()+" "+student.getMathScore()+" "+student.getEnglishScore());\n' +
      '     });                                                                                                \n' +
      '                                                                                                        \n' +
      ' } \n' +
      '```\n' +
      '\n' +
      'sorted排序方法还是和上面一样只是对管道中的流进行了操作，原集合是没有变化的，因此这里排序，可以继续用`thenComparing`对排序后的stream再进行排序操作，可以发现代码确实简洁不少。\n' +
      '\n' +
      '#### 5.3 map元素映射\n' +
      '\n' +
      '这个方法比较简单，一般是用于根据对象中某些属性的生成新的集合，它的参数是一个 Function 对象，类似数学中的函数 f(x)=y，输入x，经过函数处理就会输出我们想要的y，这里的 Function 也是一样的含义。\n' +
      '\n' +
      '**Demo3**\n' +
      '\n' +
      '比如：现在有一个Student列表，包含了学号，学生姓名以及学生各科成绩，现在需要需要一个只包含学生学号以及其各科成绩的新列表StudentScoreBean。\n' +
      '\n' +
      '```java\n' +
      ' public static void main(String[] args) {     \n' +
      '     //Student列表\n' +
      '     ArrayList<Student> students = new ArrayList<Student>() {{                                                                                              \n' +
      '         add(new Student("张三", 1, 80, 89, 86));                                                                                                             \n' +
      '         add(new Student("李四", 2, 90, 78, 100));                                                                                                            \n' +
      '         add(new Student("王武", 3, 89, 90, 89));                                                                                                             \n' +
      '         add(new Student("王富贵", 4, 79, 100, 34));                                                                                                           \n' +
      '         add(new Student("来福", 5, 100, 90, 87));                                                                                                            \n' +
      '         add(new Student("狗蛋", 6, 99, 100, 89));                                                                                                            \n' +
      '     }};                                                                                                                                                    \n' +
      '                                                                                                                                                            \n' +
      '     //对Student进行处理获得StudentScore列表                                                                                                                                                      \n' +
      '     List<StudentScoreBean> lists = students.stream().map(student -> {                                                                                        \n' +
      '         return new StudentScore(student.getStuId(), student.getMathScore(), student.getEnglishScore(), student.getChineseScore());                         \n' +
      '     }).collect(Collectors.toList());                                                                                                                       \n' +
      '                                                                                                                                                     \n' +
      '     lists.forEach(studentScore ->{                                                                                                                       \n' +
      '         System.out.println(studentScore.getStuId()+" "+studentScore.getMathScore()+" "+studentScore.getEnglishScore()+" "+studentScore.getChineseScore()); \n' +
      '     });                                                                                                                                                    \n' +
      ' }                                                                                                                                                          \n' +
      '```\n' +
      '\n' +
      '####  5.4 distinct去重\n' +
      '\n' +
      '也就是去掉集合中的重复元素，这个很简单，直接调用一下就ok。\n' +
      '\n' +
      '**Demo4**\n' +
      '\n' +
      '比如：统计所有学生种不重复的姓有多少种，列出不同的姓。\n' +
      '\n' +
      '```java\n' +
      'public static void main(String[] args) {                     \n' +
      '    ArrayList<Student> students = new ArrayList<Student>() {{\n' +
      '        add(new Student("张三",89,86));                        \n' +
      '        add(new Student("张三丰",89,86));                       \n' +
      '        add(new Student("李四",78,100));                       \n' +
      '        add(new Student("李二牛",78,100));                      \n' +
      '        add(new Student("王武",90,89));                        \n' +
      '        add(new Student("王富贵",100,34));                      \n' +
      '        add(new Student("马云",100,34));                       \n' +
      '    }};                                                      \n' +
      '                                                             \n' +
      '    List<String> collect = students.stream().map(student -> {\n' +
      '        String name = student.getName();                     \n' +
      '        return name.substring(0, 1);                         \n' +
      '    }).distinct().collect(Collectors.toList());              \n' +
      '                                                             \n' +
      '    collect.forEach(System.out::println);                    \n' +
      '} \n' +
      '```\n' +
      '\n' +
      '\n' +
      '\n' +
      '#### 5.7 groupingBy聚合操作\n' +
      '\n' +
      '我们经常会有一些操作，需要将一个List集合中的对象**按照某个特定的属性去整合**成一个Map<key, Lsit>的操作，这个时候使用流式编程的聚合方法，就很方便。\n' +
      '\n' +
      '**Demo6**\n' +
      '\n' +
      '比如：有一个Student列表，现在需要统计不同姓氏的同学并且获取他们的详细信息。\n' +
      '\n' +
      '```java\n' +
      'public static void main(String[] args) {                                                   \n' +
      '    ArrayList<Student> students = new ArrayList<Student>() {{                              \n' +
      '        add(new Student("张三", 89, 86));                                                    \n' +
      '        add(new Student("张三丰", 89, 86));                                                   \n' +
      '        add(new Student("李四", 78, 100));                                                   \n' +
      '        add(new Student("李二牛", 78, 100));                                                  \n' +
      '        add(new Student("王武", 90, 89));                                                    \n' +
      '        add(new Student("王富贵", 100, 34));                                                  \n' +
      '        add(new Student("马云", 100, 34));                                                   \n' +
      '    }};                                                                                    \n' +
      '                                                                                           \n' +
      '   //对原Student列表进行处理，按照姓分组                                                                                      \n' +
      '   Map<String, List<Student>> collect = students.stream()\n' +
      '            //这里需要过滤一下不合法的数据\n' +
      '            .filter(student -> null != student.getName() && student.getName().length() > 0)\n' +
      '            .collect(Collectors.groupingBy(student -> student.getName().substring(0,1)));  \n' +
      '                                                                                           \n' +
      '   collect.forEach((key,value)->{                                                          \n' +
      '       System.out.println("---------------------");                                        \n' +
      '       System.out.println(key);                                                            \n' +
      '       for (Student student : value) {                                                     \n' +
      '           System.out.println(student.toString());                                         \n' +
      '       }                                                                                   \n' +
      '   });                                                                                     \n' +
      '}\n' +
      '```\n' +
      '\n' +
      '\n' +
      '\n' +
      '### 6. Stream的终端操作\n' +
      '\n' +
      '#### 6.1 forEach遍历处理\n' +
      '\n' +
      '这个也是用到很多，很重要的一个方法。涉及到对集合中元素的操作的，都会使用这个方法。`void forEach(Consumer<? super T> action);` 入参是一个`Consumer`接口，这个接口也是一个函数式接口，他有两个方法，一个是`void accept(T t);` ，一个是`andThen()`的方法，可以理解为入参是流中的数据元，然后调用覆盖的方法，覆盖数据元。因为他是直接更改了六种的数据，也是最终操作，所以，集合的元素是直接改变的。\n' +
      '\n' +
      '\n' +
      '\n' +
      '#### 6.2 collect生成集合\n' +
      '\n' +
      '这个方法可能也是开发中用到最多的方法了吧，同样是一个很重要的方法。它会将一个Stream转换成目标集合。`<R, A> R collect(Collector<? super T, A, R> collector);`  入参是一个`Collector`对象，一般会使用Collector提供的几个静态方法：`Collecot.toList()`、`Collector.toSet()`  以及 `Collector.toMap()`。最总返回值会根据传入的参数类型生成不同类型的集合。\n' +
      '\n' +
      '下面是一个示例。\n' +
      '\n' +
      '```java\n' +
      'public class StreamTest {\n' +
      '    public static void main(String[] args) {\n' +
      '        Stream<Integer> randomIntegerStream = Stream.generate(() -> (int) (Math.random() * 10));\n' +
      '\n' +
      '        //Collectors.toList() 生成是3的倍数的集合\n' +
      '        List<Integer> integerList = randomIntegerStream.limit(100)\n' +
      '                .filter(num -> num!=0&&num % 3 == 0)\n' +
      '                .distinct()   //去重\n' +
      '                .collect(Collectors.toList());\n' +
      '        integerList.forEach(System.out::println);\n' +
      '\n' +
      '        \n' +
      '        //Collectors.toSet() 生成Set集合并对随机生成的100个随机数进行去重\n' +
      '        Set<Integer> integerSet = randomIntegerStream.limit(100).collect(Collectors.toSet());\n' +
      '        integerSet.forEach(System.out::println);\n' +
      '\n' +
      '        \n' +
      '        //学生列表\n' +
      '        List<Student> studentList=new ArrayList<Student>(){{\n' +
      '            add(new Student(20210001,"张三","男","1998-1-1"));\n' +
      '            add(new Student(20210002,"李四","男","1998-12-2"));\n' +
      '            add(new Student(20210003,"马超","男","1998-1-2"));\n' +
      '            add(new Student(20210004,"黄西","男","1998-9-10"));\n' +
      '            add(new Student(20210005,"李狗剩","男","1998-10-5"));\n' +
      '            add(new Student(20210006,"祝建国","男","1998-12-12"));\n' +
      '            add(new Student(20210007,"王翠花","女","1998-10-12"));\n' +
      '            add(new Student(20210008,"张三丰","男","1998-3-12"));\n' +
      '        }};\n' +
      '\n' +
      '        //Collectors.toMap() 将List转换生成Map\n' +
      '        //Collectors.toMap() 需要两个参数 第一个参数是 Map的key的取值属性，第二个参数是Map的value的取值属性，这里的Function.identity()的含义是将原对象作为其value\n' +
      '        Map<Integer, Student> studentMap = studentList.stream().collect(Collectors.toMap(Student::getStuId, Function.identity()));\n' +
      '        \n' +
      '        studentMap.forEach((key,value)->{\n' +
      '            System.out.println(key+" "+value);\n' +
      '        });\n' +
      '    }\n' +
      '}\n' +
      '```\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '#### 6.3 findFirst，findAny\n' +
      '\n' +
      '这是判断一个集合中是否有某一个对象的方法，`Optional<T> findAny();` 没有入参，返回的是一个Optional的对象。我们确定是否包含，可以调用`Optional.isPresent()`方法。\n' +
      '\n' +
      '**Demo5**\n' +
      '\n' +
      '比如：现在需要判断一个Student列表中有没有学生数学和英语成绩都大于90分的，\n' +
      '\n' +
      '```java\n' +
      'Optional<Student> any = test.stream().filter(student -> {\n' +
      '  return student.getMathScore() > 90&& student.getEnglishScore()>90}).findAny();\n' +
      'if(any.isPresent()){\n' +
      '   //表示包含\n' +
      '}\n' +
      '```\n' +
      '\n'
  },
  mounted() {
    // 记载之前做的事情
    this.pageViews = 59040
    this.publishTime = 1680080938000
    this.title = 'Java 流式编程（Stream API）'
    this.authorName = '我是小胖'
  },
}
</script>
<style scoped lang="scss">
.article-container {
  padding: 0 !important;
  margin-top: 1.767rem !important;

  .artcle-likes-bar {
    //margin-top: 100px;
    position: fixed;
    margin-left: -1.5rem;
    top: 15rem;
    z-index: 2;

    .v-btn {
      background-color: #ffffff !important;
    }

    .v-btn--fab.v-size--default {
      height: 48px;
      width: 48px;
      margin-bottom: 0.667rem;
    }

    .v-icon:hover {
      color: #515767 !important;
    }
  }

  .article-row {
    margin-left: 4.5rem;

    .article-content-box {
      .author {
        width: 100%;
        min-height: 43px;
        margin: 0 13px;
        .v-image {
          border-radius: 30px;
        }

        .author-img {
          padding: 5px 0 5px 5px;
        }

        .author-name {
          font-size: 16px;
          font-weight: 700;
          color: #515767;
        }

        .publish-time,
        .page-views {
          font-size: 15px;
          color: #8a919f;
          margin-top: 2px;
          line-height: 22px;
        }
      }
    }
  }
}

input {
  outline: none; // 使用outline属性去掉淡蓝色边框
  margin: 0 13px; //默认带有margin
  width: 100%;
  height: 60px;
  line-height: 60px !important;
  font-size: 2vw !important;
  text-align: left;
  border: 0;
  //background:rgba(235,82,134,1);
  border-radius: 0;
  // font-size:***;字体大小最好不要设置 ios上有兼容性问题
  font-family: Source Han Sans CN !important;
  font-weight: 500 !important;
  color: #1f2329 !important; //字体颜色
  caret-color: #1f2329 !important; //光标颜色
}

input::placeholder {
  line-height: 60px !important;
  font-size: 2vw !important;
  color: #bbbfc4;
  text-align: left;
}
</style>
