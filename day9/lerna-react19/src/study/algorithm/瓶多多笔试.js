// 实现一个简单的模版引擎
// 1. 变量替换 {{ name }}
// 2. 条件判断 {% if %} {% else %} {% endif %}
// 3. 循环 {% for %} {% end for %}

function render(template, data) {}
const template = `
    <div>
        <h1>{{title}}</h1>
        <ul>
            {% for (let i = 0; i < list.length; i++) { %}
                <li>{{list[i]}}</li>
            {% } %}
        </ul>
    </div>
`;

const data = {
  title: "标题",
  list: [1, 2, 3, 4],
};

console.log(render(template, data));
