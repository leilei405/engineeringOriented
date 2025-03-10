// 实现一个简单的模版引擎
// 1. 变量替换 {{ name }}
// 2. 条件判断 {% if %} {% else %} {% endif %}
// 3. 循环 {% for %} {% end for %}

// 实现一个简单的模版引擎
// 1. 变量替换 {{name}}
// 2. 条件判断 {% if %} {% else %} {% endif %}
// 3. 循环 {% for %} {% endfor %}

function escapeString(str) {
  return str.replace(/(['\\])/g, '\\$1');
}

function render(template, data) {
  // 替换变量
  // template = template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
  //   return data[key.trim()] || '';
  // });
  //
  // // 处理循环
  // template = template.replace(/\{\% for \((.*?)\) \{\s*\%\}(.*?)\{\% \}\s*\%\}/gs, (match, loop, content) => {
  //   let result = '';
  //   const escapedContent = escapeString(content.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
  //     return String(data[key.trim()] || '');
  //   }));
  //   const loopCode = `
  //           const tempArray = [];
  //           for (${loop}) {
  //               tempArray.push(\`${escapedContent}\`);
  //           }
  //           result = tempArray.join('');
  //       `;
  //   try {
  //     const scope = { data, result };
  //     new Function('scope', loopCode).call(null, scope);
  //     result = scope.result;
  //   } catch (error) {
  //     console.error('循环处理出错:', error);
  //   }
  //   return result;
  // });
  //
  // // 处理条件判断
  // template = template.replace(/\{\% if \((.*?)\) \{\s*\%\}(.*?)\{\% else \s*\%\}(.*?)\{\% endif \s*\%\}/gs, (match, condition, trueContent, falseContent) => {
  //   try {
  //     const scope = { data };
  //     const conditionResult = new Function('scope', `return ${condition}`).call(null, scope);
  //     return conditionResult ? trueContent : falseContent;
  //   } catch (error) {
  //     console.error('条件判断处理出错:', error);
  //     return '';
  //   }
  // });

  return template;
}

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
