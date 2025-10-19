const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Rozpoczynam seedowanie bazy danych...')

  // Hasło dla wszystkich użytkowników testowych: "password123"
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Użytkownik 1: Jan Kowalski
  const jan = await prisma.user.upsert({
    where: { email: 'jan.kowalski@example.com' },
    update: {},
    create: {
      name: 'Jan Kowalski',
      email: 'jan.kowalski@example.com',
      password: hashedPassword,
      phone: '+48 123 456 789',
      address: 'ul. Główna 10, Warszawa',
      bio: 'Jestem entuzjastą DIY i chętnie pożyczam narzędzia sąsiadom!',
      latitude: 52.2297,
      longitude: 21.0122,
    },
  })
  console.log('✅ Utworzono użytkownika: Jan Kowalski')

  // Użytkownik 2: Anna Nowak
  const anna = await prisma.user.upsert({
    where: { email: 'anna.nowak@example.com' },
    update: {},
    create: {
      name: 'Anna Nowak',
      email: 'anna.nowak@example.com',
      password: hashedPassword,
      phone: '+48 234 567 890',
      address: 'ul. Kwiatowa 5, Warszawa',
      bio: 'Emerytka z czasem wolnym, chętnie pomogę w zakupach!',
      latitude: 52.2320,
      longitude: 21.0180,
    },
  })
  console.log('✅ Utworzono użytkownika: Anna Nowak')

  // Użytkownik 3: Piotr Wiśniewski
  const piotr = await prisma.user.upsert({
    where: { email: 'piotr.wisniewski@example.com' },
    update: {},
    create: {
      name: 'Piotr Wiśniewski',
      email: 'piotr.wisniewski@example.com',
      password: hashedPassword,
      phone: '+48 345 678 901',
      address: 'ul. Słoneczna 15, Warszawa',
      bio: 'Student, czasem potrzebuję pomocy w transporcie większych rzeczy.',
      latitude: 52.2250,
      longitude: 21.0100,
    },
  })
  console.log('✅ Utworzono użytkownika: Piotr Wiśniewski')

  // Przykładowe ogłoszenia
  const post1 = await prisma.post.create({
    data: {
      title: 'Pożyczę wiertarkę udarową',
      description: 'Mam profesjonalną wiertarkę Bosch, którą chętnie pożyczę na weekend. Sprzęt w doskonałym stanie.',
      category: 'narzedzia',
      status: 'active',
      authorId: jan.id,
      latitude: 52.2297,
      longitude: 21.0122,
      address: 'ul. Główna 10, Warszawa',
    },
  })
  console.log('✅ Utworzono ogłoszenie: Pożyczę wiertarkę')

  const post2 = await prisma.post.create({
    data: {
      title: 'Pomoc w zakupach spożywczych',
      description: 'Oferuję pomoc w zakupach dla osób starszych lub niepełnosprawnych. Mogę zrobić zakupy i dostarczyć pod drzwi.',
      category: 'pomoc_w_zakupach',
      status: 'active',
      authorId: anna.id,
      latitude: 52.2320,
      longitude: 21.0180,
      address: 'ul. Kwiatowa 5, Warszawa',
    },
  })
  console.log('✅ Utworzono ogłoszenie: Pomoc w zakupach')

  const post3 = await prisma.post.create({
    data: {
      title: 'Potrzebuję pomocy przy przewiezieniu mebli',
      description: 'Kupiłem szafę z IKEA i potrzebuję kogoś z vanem do przewiezienia. Odległość około 10km.',
      category: 'transport',
      status: 'active',
      authorId: piotr.id,
      latitude: 52.2250,
      longitude: 21.0100,
      address: 'ul. Słoneczna 15, Warszawa',
    },
  })
  console.log('✅ Utworzono ogłoszenie: Transport mebli')

  // Przykładowe komentarze
  await prisma.comment.create({
    data: {
      content: 'Witam! Jestem zainteresowany pożyczeniem wiertarki. Czy w sobotę byłaby dostępna?',
      postId: post1.id,
      authorId: piotr.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Tak, w sobotę jest dostępna. Może być od 10:00.',
      postId: post1.id,
      authorId: jan.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Super! Dziękuję, odezwę się SMS-em.',
      postId: post1.id,
      authorId: piotr.id,
    },
  })
  console.log('✅ Utworzono przykładowe komentarze')

  // Przykładowe oceny
  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Wiertarka w świetnym stanie, Jan bardzo pomocny. Polecam!',
      reviewerId: piotr.id,
      reviewedId: jan.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Pani Anna bardzo miła i punktualna. Świetna pomoc!',
      reviewerId: jan.id,
      reviewedId: anna.id,
    },
  })
  console.log('✅ Utworzono przykładowe oceny')

  console.log('\n🎉 Seedowanie zakończone pomyślnie!')
  console.log('\n📧 Możesz się zalogować jako:')
  console.log('   Email: jan.kowalski@example.com')
  console.log('   Email: anna.nowak@example.com')
  console.log('   Email: piotr.wisniewski@example.com')
  console.log('   Hasło dla wszystkich: password123')
}

main()
  .catch((e) => {
    console.error('❌ Błąd podczas seedowania:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

