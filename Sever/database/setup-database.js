// 데이터베이스 초기 설정 스크립트
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupDatabase() {
  let connection;

  try {
    console.log('🔄 MySQL 서버에 연결 중...');

    // 데이터베이스 없이 먼저 연결 (루트 연결)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: Number(process.env.DB_PORT) || 3306,
      charset: 'utf8mb4',
      multipleStatements: true // 여러 SQL 문 실행 허용
    });

    console.log('✅ MySQL 서버 연결 성공');

    // SQL 파일 읽기
    console.log('📖 SQL 파일 읽는 중...');
    const sqlFilePath = join(__dirname, 'CodeMap.sql');
    const sql = readFileSync(sqlFilePath, 'utf8');

    console.log('🗑️  기존 데이터베이스 삭제 중 (있는 경우)...');
    await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME || 'codemap'}`);

    console.log('⚙️  데이터베이스 생성 및 테이블 생성 중...');
    await connection.query(sql);

    console.log('✅ 데이터베이스 및 테이블 생성 완료!');
    console.log('\n📊 생성된 주요 테이블:');
    console.log('   - users (사용자)');
    console.log('   - projects (프로젝트)');
    console.log('   - project_schedules (일정)');
    console.log('   - ai_suggestions (AI 제안)');
    console.log('   - coding_problems (코딩 문제)');
    console.log('   - community_posts (커뮤니티)');
    console.log('   - 그 외 20개 이상의 테이블');

    // 테이블 목록 조회
    console.log('\n🔍 생성된 테이블 확인 중...');
    const [tables] = await connection.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
       WHERE TABLE_SCHEMA = '${process.env.DB_NAME || 'codemap'}'
       ORDER BY TABLE_NAME`
    );

    console.log(`\n📋 총 ${tables.length}개의 테이블이 생성되었습니다:`);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.TABLE_NAME}`);
    });

    console.log('\n✅ 데이터베이스 설정 완료!');
    console.log('🚀 이제 서버를 시작할 수 있습니다: npm start');

  } catch (error) {
    console.error('❌ 데이터베이스 설정 실패:', error.message);

    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 해결 방법:');
      console.error('   1. .env 파일의 DB_USER와 DB_PASSWORD를 확인하세요');
      console.error('   2. MySQL이 실행 중인지 확인하세요');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 해결 방법:');
      console.error('   1. MySQL 서버가 실행 중인지 확인하세요');
      console.error('   2. .env 파일의 DB_HOST와 DB_PORT를 확인하세요');
    }

    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 실행
setupDatabase();
