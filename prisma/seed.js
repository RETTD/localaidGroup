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

  // Użytkownik 4: Małgorzata Dąbrowska
  const malgorzata = await prisma.user.upsert({
    where: { email: 'malgorzata.dabrowska@example.com' },
    update: {},
    create: {
      name: 'Małgorzata Dąbrowska',
      email: 'malgorzata.dabrowska@example.com',
      password: hashedPassword,
      phone: '+48 456 789 012',
      address: 'ul. Parkowa 8, Warszawa',
      bio: 'Mama dwójki dzieci, chętnie pomogę w opiece nad dziećmi.',
      latitude: 52.2280,
      longitude: 21.0150,
    },
  })
  console.log('✅ Utworzono użytkownika: Małgorzata Dąbrowska')

  // Użytkownik 5: Tomasz Lewandowski
  const tomasz = await prisma.user.upsert({
    where: { email: 'tomasz.lewandowski@example.com' },
    update: {},
    create: {
      name: 'Tomasz Lewandowski',
      email: 'tomasz.lewandowski@example.com',
      password: hashedPassword,
      phone: '+48 567 890 123',
      address: 'ul. Lipowa 22, Warszawa',
      bio: 'Mechanik samochodowy, mogę pomóc w drobnych naprawach.',
      latitude: 52.2310,
      longitude: 21.0200,
    },
  })
  console.log('✅ Utworzono użytkownika: Tomasz Lewandowski')

  // Użytkownik 6: Katarzyna Mazur
  const katarzyna = await prisma.user.upsert({
    where: { email: 'katarzyna.mazur@example.com' },
    update: {},
    create: {
      name: 'Katarzyna Mazur',
      email: 'katarzyna.mazur@example.com',
      password: hashedPassword,
      phone: '+48 678 901 234',
      address: 'ul. Szkolna 3, Warszawa',
      bio: 'Nauczycielka matematyki, oferuję korepetycje.',
      latitude: 52.2260,
      longitude: 21.0080,
    },
  })
  console.log('✅ Utworzono użytkownika: Katarzyna Mazur')

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

  const post4 = await prisma.post.create({
    data: {
      title: 'Poszukuję korepetycji z matematyki',
      description: 'Szukam kogoś kto pomoże mojemu synowi przygotować się do matury z matematyki rozszerzonej.',
      category: 'nauka',
      status: 'active',
      authorId: malgorzata.id,
      latitude: 52.2280,
      longitude: 21.0150,
      address: 'ul. Parkowa 8, Warszawa',
    },
  })

  const post5 = await prisma.post.create({
    data: {
      title: 'Oferuję korepetycje z matematyki',
      description: 'Nauczycielka z 10-letnim doświadczeniem. Wszystkie poziomy, przygotowanie do egzaminów.',
      category: 'nauka',
      status: 'active',
      authorId: katarzyna.id,
      latitude: 52.2260,
      longitude: 21.0080,
      address: 'ul. Szkolna 3, Warszawa',
    },
  })

  const post6 = await prisma.post.create({
    data: {
      title: 'Pomoc w drobnych naprawach samochodowych',
      description: 'Mechanik z doświadczeniem. Mogę pomóc wymienić olej, klocki hamulcowe, itp. Za symboliczną opłatą.',
      category: 'prace_domowe',
      status: 'active',
      authorId: tomasz.id,
      latitude: 52.2310,
      longitude: 21.0200,
      address: 'ul. Lipowa 22, Warszawa',
    },
  })

  const post7 = await prisma.post.create({
    data: {
      title: 'Pożyczę kosiarko-wykaszarkę',
      description: 'Elektryczna kosiarka Bosch + wykaszarka spalinowa Stihl. Idealna na wiosenne porządki.',
      category: 'narzedzia',
      status: 'active',
      authorId: jan.id,
      latitude: 52.2297,
      longitude: 21.0122,
      address: 'ul. Główna 10, Warszawa',
    },
  })

  const post8 = await prisma.post.create({
    data: {
      title: 'Oddam za darmo kwiaty doniczkowe',
      description: 'Wyjeżdżam na miesiąc i mam za dużo roślin. Oddam geranium, begonie i sansewierie.',
      category: 'inne',
      status: 'active',
      authorId: anna.id,
      latitude: 52.2320,
      longitude: 21.0180,
      address: 'ul. Kwiatowa 5, Warszawa',
    },
  })

  const post9 = await prisma.post.create({
    data: {
      title: 'Opieka nad psem w weekendy',
      description: 'Mam mały ogródek i uwielbiam psy. Mogę zaopiekować się Twoim psem gdy wyjeżdżasz.',
      category: 'opieka',
      status: 'active',
      authorId: malgorzata.id,
      latitude: 52.2280,
      longitude: 21.0150,
      address: 'ul. Parkowa 8, Warszawa',
    },
  })

  const post10 = await prisma.post.create({
    data: {
      title: 'Potrzebuję pomocy w sprzątaniu mieszkania',
      description: 'Przeprowadzka. Szukam kogoś do pomocy w sprzątaniu mieszkania (60m2) - 2-3h pracy.',
      category: 'prace_domowe',
      status: 'completed',
      authorId: piotr.id,
      latitude: 52.2250,
      longitude: 21.0100,
      address: 'ul. Słoneczna 15, Warszawa',
    },
  })

  const post11 = await prisma.post.create({
    data: {
      title: 'Podwiezienie na lotnisko',
      description: 'Regularne wyjazdy służbowe. Szukam osoby która mogłaby podrzucić mnie na lotnisko Okęcie.',
      category: 'transport',
      status: 'active',
      authorId: katarzyna.id,
      latitude: 52.2260,
      longitude: 21.0080,
      address: 'ul. Szkolna 3, Warszawa',
    },
  })

  const post12 = await prisma.post.create({
    data: {
      title: 'Wymiana lamp - pomoc elektryka',
      description: 'Trzeba wymienić kilka lamp w domu. Poszukuję kogoś kto się na tym zna.',
      category: 'prace_domowe',
      status: 'active',
      authorId: anna.id,
      latitude: 52.2320,
      longitude: 21.0180,
      address: 'ul. Kwiatowa 5, Warszawa',
    },
  })

  const post13 = await prisma.post.create({
    data: {
      title: 'Pożyczę drabinę 5-metrową',
      description: 'Solidna drabina aluminiowa 5m. Idealna do prac na wysokości.',
      category: 'narzedzia',
      status: 'active',
      authorId: tomasz.id,
      latitude: 52.2310,
      longitude: 21.0200,
      address: 'ul. Lipowa 22, Warszawa',
    },
  })

  const post14 = await prisma.post.create({
    data: {
      title: 'Zakupy dla seniora - regularna pomoc',
      description: 'Pomagam swojemu dziadkowi i mogę pomóc także innym seniorom w okolicy. Zakupy raz w tygodniu.',
      category: 'pomoc_w_zakupach',
      status: 'active',
      authorId: piotr.id,
      latitude: 52.2250,
      longitude: 21.0100,
      address: 'ul. Słoneczna 15, Warszawa',
    },
  })

  const post15 = await prisma.post.create({
    data: {
      title: 'Korepetycje z języka angielskiego',
      description: 'Student filologii angielskiej. Oferuję korepetycje dla dzieci i młodzieży.',
      category: 'nauka',
      status: 'active',
      authorId: piotr.id,
      latitude: 52.2250,
      longitude: 21.0100,
      address: 'ul. Słoneczna 15, Warszawa',
    },
  })

  const post16 = await prisma.post.create({
    data: {
      title: 'Pomoc w pracach ogrodowych',
      description: 'Mam duży ogród i chętnie pomogę sąsiadom w pieleniu, przycinaniu czy sadzeniu.',
      category: 'prace_domowe',
      status: 'active',
      authorId: jan.id,
      latitude: 52.2297,
      longitude: 21.0122,
      address: 'ul. Główna 10, Warszawa',
    },
  })

  const post17 = await prisma.post.create({
    data: {
      title: 'Opieka nad dziećmi - wieczory',
      description: 'Mama z doświadczeniem. Mogę zaopiekować się dziećmi w godzinach wieczornych.',
      category: 'opieka',
      status: 'active',
      authorId: malgorzata.id,
      latitude: 52.2280,
      longitude: 21.0150,
      address: 'ul. Parkowa 8, Warszawa',
    },
  })

  const post18 = await prisma.post.create({
    data: {
      title: 'Przeniesienie mebli w mieszkaniu',
      description: 'Przestawiam pokoje i potrzebuję kogoś do pomocy w przeniesieniu szafy i łóżka.',
      category: 'transport',
      status: 'cancelled',
      authorId: anna.id,
      latitude: 52.2320,
      longitude: 21.0180,
      address: 'ul. Kwiatowa 5, Warszawa',
    },
  })

  const post19 = await prisma.post.create({
    data: {
      title: 'Naprawa kranów i drobne prace hydrauliczne',
      description: 'Mam narzędzia i doświadczenie. Mogę pomóc w drobnych naprawach hydraulicznych.',
      category: 'prace_domowe',
      status: 'active',
      authorId: tomasz.id,
      latitude: 52.2310,
      longitude: 21.0200,
      address: 'ul. Lipowa 22, Warszawa',
    },
  })

  const post20 = await prisma.post.create({
    data: {
      title: 'Pożyczę projektor multimedialny',
      description: 'Projektor Full HD do prezentacji, filmów czy imprez. Dostępny na weekendy.',
      category: 'narzedzia',
      status: 'active',
      authorId: katarzyna.id,
      latitude: 52.2260,
      longitude: 21.0080,
      address: 'ul. Szkolna 3, Warszawa',
    },
  })

  const post21 = await prisma.post.create({
    data: {
      title: 'Pomoc przy remoncie łazienki',
      description: 'Szukam kogoś z doświadczeniem do pomocy przy remoncie łazienki - kładzenie płytek.',
      category: 'prace_domowe',
      status: 'active',
      authorId: jan.id,
      latitude: 52.2297,
      longitude: 21.0122,
      address: 'ul. Główna 10, Warszawa',
    },
  })

  const post22 = await prisma.post.create({
    data: {
      title: 'Zakupy spożywcze - pomoc jednorazowa',
      description: 'Jestem chora i potrzebuję pomocy w zrobieniu zakupów. Lista przygotowana.',
      category: 'pomoc_w_zakupach',
      status: 'completed',
      authorId: katarzyna.id,
      latitude: 52.2260,
      longitude: 21.0080,
      address: 'ul. Szkolna 3, Warszawa',
    },
  })

  console.log('✅ Utworzono 22 ogłoszenia')

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

  await prisma.comment.create({
    data: {
      content: 'Bardzo chętnie pomogę! Robię zakupy w każdy piątek, mogę coś przywieźć.',
      postId: post2.id,
      authorId: jan.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Ja również mogę pomóc, mieszkam blisko Biedronki.',
      postId: post2.id,
      authorId: malgorzata.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Mam busa i mogę pomóc w weekend. Proszę o kontakt.',
      postId: post3.id,
      authorId: tomasz.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Świetnie! Jakie są koszty?',
      postId: post3.id,
      authorId: piotr.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Za 10km to 50zł wystarczy na benzynę 😊',
      postId: post3.id,
      authorId: tomasz.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Jestem zainteresowana! Moja córka ma wkrótce maturę.',
      postId: post5.id,
      authorId: malgorzata.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Proszę o kontakt telefoniczny, ustalimy termin.',
      postId: post5.id,
      authorId: katarzyna.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Mechanik - zloty człowiek! Polecam wszystkim.',
      postId: post6.id,
      authorId: jan.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Potrzebuję pomocy z wymianą oleju, jak mogę się umówić?',
      postId: post6.id,
      authorId: piotr.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Możemy w sobotę rano, napisz SMS.',
      postId: post6.id,
      authorId: tomasz.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Bardzo bym chciała! Uwielbiam kwiaty. Kiedy mogę je odebrać?',
      postId: post8.id,
      authorId: malgorzata.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'W weekend będę w domu, zapraszam!',
      postId: post8.id,
      authorId: anna.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Idealnie! Mam psa golden retrievera, czy to problem?',
      postId: post9.id,
      authorId: jan.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Żaden problem! Uwielbiam golden retrievery 🐕',
      postId: post9.id,
      authorId: malgorzata.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Pożyczyłem wiertarkę i kosiarkę - sprzęt super!',
      postId: post7.id,
      authorId: tomasz.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Mogę pomóc z pracami elektrycznymi, mam uprawnienia SEP.',
      postId: post12.id,
      authorId: tomasz.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Świetnie! Jak mogę się z Tobą skontaktować?',
      postId: post12.id,
      authorId: anna.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Potrzebuję drabiny na tydzień, czy to możliwe?',
      postId: post13.id,
      authorId: jan.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Tak, żaden problem. Jak najbliższy weekend?',
      postId: post13.id,
      authorId: tomasz.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Dzięki za pomoc! Wszystko przebiegło sprawnie.',
      postId: post10.id,
      authorId: piotr.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Cała przyjemność po mojej stronie! 😊',
      postId: post10.id,
      authorId: anna.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Bardzo dziękuję za pomoc! Zakupy dostarczone na czas.',
      postId: post22.id,
      authorId: katarzyna.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Zawsze służę pomocą! Szybkiego powrotu do zdrowia!',
      postId: post22.id,
      authorId: malgorzata.id,
    },
  })

  console.log('✅ Utworzono 27 komentarzy')

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

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Tomasz - złoty człowiek! Naprawił mi kran w 15 minut. Profesjonalista!',
      reviewerId: anna.id,
      reviewedId: tomasz.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 4,
      comment: 'Katarzyna - świetna nauczycielka. Mój syn poprawił ocenę z matury!',
      reviewerId: malgorzata.id,
      reviewedId: katarzyna.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Małgosia zaopiekowała się moim psem jak swoim. Polecam!',
      reviewerId: jan.id,
      reviewedId: malgorzata.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Piotr pomógł mi przewieźć meble. Punktualny i pomocny!',
      reviewerId: tomasz.id,
      reviewedId: piotr.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 4,
      comment: 'Świetna pomoc w zakupach. Wszystko dokładnie według listy.',
      reviewerId: katarzyna.id,
      reviewedId: anna.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Jan ma najlepsze narzędzia w okolicy! Wszystko czyste i sprawne.',
      reviewerId: tomasz.id,
      reviewedId: jan.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Piotr bardzo pomocny student. Korepetycje z angielskiego super!',
      reviewerId: malgorzata.id,
      reviewedId: piotr.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 4,
      comment: 'Tomasz szybko i profesjonalnie wymienił mi olej w samochodzie.',
      reviewerId: piotr.id,
      reviewedId: tomasz.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Anna pomogła mi w sprzątaniu. Bardzo dokładna i szybka!',
      reviewerId: piotr.id,
      reviewedId: anna.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Katarzyna - najlepsza nauczycielka! Moja córka wreszcie rozumie matematykę.',
      reviewerId: jan.id,
      reviewedId: katarzyna.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 4,
      comment: 'Małgosia bardzo troskliwie opiekowała się moimi dziećmi. Dzięki!',
      reviewerId: katarzyna.id,
      reviewedId: malgorzata.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Jan pomógł mi w ogrodzie. Ma świetne pomysły i doświadczenie.',
      reviewerId: anna.id,
      reviewedId: jan.id,
    },
  })

  await prisma.rating.create({
    data: {
      rating: 5,
      comment: 'Piotr zawsze chętnie pomoże. Świetny sąsiad!',
      reviewerId: katarzyna.id,
      reviewedId: piotr.id,
    },
  })

  console.log('✅ Utworzono 15 ocen')

  console.log('\n🎉 Seedowanie zakończone pomyślnie!')
  console.log('\n📊 Podsumowanie:')
  console.log('   ✅ Utworzono 6 użytkowników')
  console.log('   ✅ Utworzono 22 ogłoszenia')
  console.log('   ✅ Utworzono 27 komentarzy')
  console.log('   ✅ Utworzono 15 ocen')
  console.log('\n📧 Możesz się zalogować jako:')
  console.log('   Email: jan.kowalski@example.com')
  console.log('   Email: anna.nowak@example.com')
  console.log('   Email: piotr.wisniewski@example.com')
  console.log('   Email: malgorzata.dabrowska@example.com')
  console.log('   Email: tomasz.lewandowski@example.com')
  console.log('   Email: katarzyna.mazur@example.com')
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

