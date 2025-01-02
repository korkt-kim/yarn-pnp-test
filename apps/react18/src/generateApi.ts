/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'node:path'

import { generateApi } from 'swagger-typescript-api'

// camelCase를 snake_case로 변환하는 유틸리티 함수
const camelToSnake = (str: string) => {
  // 대문자 앞에 언더스코어를 추가하고 전체를 소문자로 변환
  return str
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    .replace(/^_/, '')
}

// 객체의 모든 키를 재귀적으로 변환하는 함수
function transformKeys(obj: any): any {
  // 배열인 경우에는 각 요소를 재귀적으로 변환합니다
  if (Array.isArray(obj)) {
    return obj.map(transformKeys)
  }

  // 객체인 경우 각 키를 변환하고 값도 재귀적으로 처리합니다
  if (obj && typeof obj === 'object') {
    const transformed: Record<string, any> = {}

    Object.entries(obj).forEach(([key, value]) => {
      // camelCase 키를 snake_case로 변환
      const snakeKey = camelToSnake(key)
      // 값이 객체나 배열인 경우 재귀적으로 처리
      transformed[snakeKey] = transformKeys(value)
    })

    return transformed
  }

  console.log(obj)
  return obj
}

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
generateApi({
  // 생성될 API 클라이언트 파일의 이름
  name: 'stanodejsresult.ts',

  // 생성된 파일이 저장될 디렉토리 경로. set to `false` to prevent the tool from writing to disk
  output: path.resolve(process.cwd(), './src'),

  // Swagger 명세를 가져오는 방법 (셋 중 하나는 필수)
  url: 'https://petstore.swagger.io/v2/swagger.json', // URL에서 가져오기

  templates: path.resolve(process.cwd(), './api-templates'),

  // HTTP 클라이언트 선택 (axios 또는 fetch)
  httpClientType: 'axios', // or "fetch"

  // 응답 처리 관련 설정
  defaultResponseAsSuccess: false, // 모든 응답을 성공으로 처리할지
  generateResponses: true, // 응답 타입 생성 여부
  unwrapResponseData: false, // 응답 데이터 자동 언래핑 여부

  // 코드 생성 범위 설정
  generateClient: true, // API 클라이언트 코드 생성
  generateRouteTypes: false, // 라우트 타입 생성

  toJS: false,

  // 타입 추출 설정
  extractRequestParams: false, // 요청 파라미터 추출
  extractRequestBody: false, // 요청 바디 추출
  extractEnums: false, // enum 타입 추출

  prettier: {
    // By default prettier config is load from your project
    printWidth: 120,
    tabWidth: 2,
    trailingComma: 'all',
    parser: 'typescript',
  },
  defaultResponseType: 'void',
  singleHttpClient: true,
  cleanOutput: false,
  enumNamesAsValues: false,
  moduleNameFirstTag: false,
  generateUnionEnums: false,
  typePrefix: '',
  typeSuffix: '',
  enumKeyPrefix: '',
  enumKeySuffix: '',
  addReadonly: false,
  sortTypes: false,

  // API 요청/응답 관련 접미사 설정
  extractingOptions: {
    requestBodySuffix: ['Payload', 'Body', 'Input'], // 요청 바디에 사용할 접미사들
    requestParamsSuffix: ['Params'], // 요청 파라미터에 사용할 접미사
    responseBodySuffix: ['Data', 'Result', 'Output'], // 응답 데이터에 사용할 접미사
    responseErrorSuffix: [
      'Error',
      'Fail',
      'Fails',
      'ErrorData',
      'HttpError',
      'BadResponse',
    ], // 에러 응답에 사용할 접미사
  },
  /** allow to generate extra files based with this extra templates, see more below */
  extraTemplates: [],
  fixInvalidTypeNamePrefix: 'Type',
  fixInvalidEnumKeyPrefix: 'Value',
  codeGenConstructs: constructs =>
    ({
      ...constructs,
      RecordType: (key: string, value: unknown) => `Record<${key}, ${value}>`,
    }) as typeof constructs,

  // 코드 생성 과정을 커스터마이즈
  hooks: {
    // onCreateComponent: component => {},
    // onCreateRequestParams: rawType => {},
    // onCreateRoute: routeData => {},
    // onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
    // onFormatRouteName: (routeInfo, templateRouteName) => {},
    // onFormatTypeName: (typeName, rawTypeName, schemaType) => {},
    // onInit: configuration => {},
    // onPreParseSchema: (originalSchema, typeName, schemaType) => {},
    // 스키마 파싱 전에 실행되는 훅
    onPreParseSchema: (originalSchema: any) => {
      if (originalSchema.properties) {
        // 프로퍼티 이름을 snake_case로 변환
        const transformedProperties = transformKeys(originalSchema.properties)
        console.log(transformedProperties)
        return {
          properties: transformedProperties,
        }
      }
      return originalSchema
    },
    // // 스키마 파싱 후에도 한 번 더 확인
    // onFormatTypeName: typeName => {
    //   // 타입 이름도 snake_case로 변환

    //   console.log(typeName)
    //   return camelToSnake(typeName)
    // },

    // 컴포넌트 생성 시에도 확인
    // onCreateComponent: (component: any) => {
    //   if (component.properties) {
    //     component.properties = transformKeys(component.properties)
    //   }
    //   return component
    // },
  },
})

// generateTemplates({
//   cleanOutput: false,
//   output: './',
//   httpClientType: 'fetch',
//   modular: false,
//   silent: false,
// })
