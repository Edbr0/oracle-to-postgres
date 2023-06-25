<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { openAiStore } from '../../store'
  import { format } from 'sql-formatter';
  import TextAreaCode from '../../components/TextAreaCode/index.vue'


  export default defineComponent({
    components:{
      TextAreaCode
    },
    setup(){

      const prompt = ref<string>('');

      const response = ref<string>('');

      const loading = ref<boolean>(false)

      const store = openAiStore()

      const validateInputText = (text: string) => {
        const sqlRegex = /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FUNCTION|PROCEDURE)\s+/i;

        if (sqlRegex.test(text)) {
          return true
        } else {
          return false
        }
      }

      const oracleToPostgres = {
        "VARCHAR2": "VARCHAR",
        "CHAR": "CHARACTER",
        "NUMBER": "INTEGER",
        "NUMBER(n)": "INTEGER",
        "FLOAT": "DOUBLE PRECISION",
        "DATE": "TIMESTAMP",
        "TIMESTAMP": "TIMESTAMP",
        "INTERVAL YEAR TO MONTH": "INTERVAL YEAR",
        "INTERVAL DAY TO SECOND": "INTERVAL",
        "BLOB": "BYTEA",
        "CLOB": "TEXT",
        "SYSDATE": "CURRENT_TIMESTAMP"
      };

      const  replaceOracleTypes = (sql: string) => {
        let newSql = sql;
        for (let oracleType in oracleToPostgres) {
          let regExp = new RegExp("\\b" + oracleType + "\\b", "gi");
          console.log(regExp)
          newSql = newSql.replace(regExp, oracleToPostgres[oracleType]);
        }
        newSql = newSql.replace(/INTEGER\(\d+\)/g, "INTEGER");
        return newSql;
      }

      const convert = async () => {
        const inputTextUpper = prompt.value.toUpperCase()
        if(!validateInputText(inputTextUpper)) return alert('Isso não é um sql válido')
        loading.value = true;

        setTimeout(()=>{
          response.value = format(replaceOracleTypes(inputTextUpper), { language: 'postgresql' })
          loading.value = false;
        }, 1000)
      }

      return {
        prompt,
        convert,
        response,
        loading
      }
    }
  })
</script>
<style>
  .fundo-black{
    background: rgb(16, 16, 20);
  }
  .w-card-input{
    width: 600px;
  }
</style>
<template>
    <div
  class="
    flex
    items-center
    justify-around
    w-screen
    h-screen
    fundo-black
  "
>
    <div class="w-card-input">
        <n-space vertical>
            <n-input
            h-lg
            type="textarea"
            placeholder="Digite ou cole seu sql aqui"
            :autosize="{
                minRows: 3
            }"
            v-model:value="prompt"
            />
        </n-space>
    </div>
    <n-button @click="convert" :loading="loading" type="success">Converter</n-button>
    <div class="w-card-input">
      <TextAreaCode  :content="{ text: response, type: 'sql' }"/>
    </div>
  
</div>
</template>