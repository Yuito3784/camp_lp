"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowUp,
  Tent,
  Flame,
  Mountain,
  Trees,
  Star,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  Mail,
  Clock,
} from "lucide-react"

export default function CampingLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [randomCounter, setRandomCounter] = useState(853)
  const [countdown, setCountdown] = useState(99)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  const galleryImages = [
    { url: "/camping-tent-at-sunset-with-mountains.jpg", alt: "テントと夕日" },
    { url: "/campfire-with-people-sitting-around-at-night.jpg", alt: "焚き火" },
    { url: "/mountain-lake-camping-site-with-forest.jpg", alt: "湖畔のキャンプ" },
    { url: "/camping-cooking-outdoor-breakfast.jpg", alt: "アウトドア料理" },
    { url: "/starry-night-sky-over-camping-tents.jpg", alt: "星空キャンプ" },
    { url: "/hiking-trail-in-forest-with-backpack.jpg", alt: "ハイキング" },
  ]

  const testimonials = [
    { name: "田中 太郎", text: "最高のキャンプ体験でした！スタッフの対応も素晴らしく、また来たいです。", rating: 5 },
    { name: "佐藤 花子", text: "自然に囲まれて心が癒されました。設備も充実していて快適でした。", rating: 5 },
    { name: "鈴木 一郎", text: "家族全員が楽しめました。子供たちも大喜びで、思い出に残る旅になりました。", rating: 5 },
  ]

  // Random counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 11) + 10
      const plusOrMinus = Math.random() < 0.5 ? -1 : 1
      setRandomCounter((prev) => prev + change * plusOrMinus)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Countdown effect
  useEffect(() => {
    const getRandomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

    const countdownTimer = () => {
      if (countdown <= 0) return

      const delay = countdown > 55 ? getRandomDelay(1000, 5000) : getRandomDelay(8000, 20000)

      setTimeout(() => {
        setCountdown((prev) => Math.max(0, prev - 1))
      }, delay)
    }

    countdownTimer()
  }, [countdown])

  // Modal auto-open
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true)
    }, 20000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      setScrollY(scrolled)
      setShowScrollTop(scrolled > 500)
      setShowBanner(scrolled > 800 && scrolled < 4000)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Current date
  useEffect(() => {
    const today = new Date()
    const month = today.getMonth() + 1
    const date = today.getDate()
    setCurrentDate(`${month}月${date}日`)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openGallery = (index: number) => {
    setSelectedImage(index)
    setIsGalleryOpen(true)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-green-900 to-emerald-950">
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        style={{
          backgroundImage: `url('/beautiful-camping-site-with-mountains-and-forest-a.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-8 backdrop-blur-sm">
            <Tent className="w-4 h-4 text-emerald-300" />
            <span className="text-sm text-emerald-200">大自然の中で最高の体験を</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent leading-tight drop-shadow-2xl">
            森と湖の
            <br />
            キャンプリゾート
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            都会の喧騒を離れ、大自然の中で心を解放する。
            <br />
            忘れられない思い出を、ここで作りませんか。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => setIsBookingModalOpen(true)}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/60 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                今すぐ予約する
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full bg-transparent backdrop-blur-sm"
            >
              詳細を見る
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 text-white/70 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/70 rounded-full animate-scroll" />
            </div>
            <span className="text-sm">スクロールして詳細を確認</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-y border-emerald-800/50 bg-emerald-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50 hover:border-emerald-500/50 transition-all hover:scale-105">
            <div className="text-5xl font-bold text-emerald-400 mb-2">12,000</div>
            <div className="text-emerald-200">年間利用者数</div>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50 hover:border-green-500/50 transition-all hover:scale-105">
            <div className="text-5xl font-bold text-green-400 mb-2">98%</div>
            <div className="text-emerald-200">満足度</div>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50 hover:border-lime-500/50 transition-all hover:scale-105">
            <div className="text-5xl font-bold text-lime-400 mb-2">24時間</div>
            <div className="text-emerald-200">サポート体制</div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-emerald-950/50 to-green-950/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 text-white">キャンプの魅力</h2>
          <p className="text-center text-emerald-200 mb-16 text-lg">大自然の中で過ごす特別な時間</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                onClick={() => openGallery(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-semibold text-lg">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">プラン選択</h2>

          <Tabs defaultValue="day" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-emerald-900/50 border border-emerald-700/50">
              <TabsTrigger value="day" className="data-[state=active]:bg-emerald-600">
                日帰り
              </TabsTrigger>
              <TabsTrigger value="overnight" className="data-[state=active]:bg-emerald-600">
                1泊2日
              </TabsTrigger>
              <TabsTrigger value="weekend" className="data-[state=active]:bg-emerald-600">
                2泊3日
              </TabsTrigger>
            </TabsList>

            <TabsContent value="day" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50">
                  <Tent className="w-12 h-12 text-emerald-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">デイキャンププラン</h3>
                  <p className="text-emerald-200 mb-6">朝から夕方まで、気軽にキャンプを楽しめるプランです。</p>
                  <div className="text-4xl font-bold text-emerald-400 mb-6">¥3,500</div>
                  <Button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    予約する
                  </Button>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50">
                  <img
                    src="/day-camping-with-bbq-and-picnic.jpg"
                    alt="デイキャンプ"
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <ul className="space-y-2 text-emerald-200">
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-emerald-400" />
                      BBQ設備利用可
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-emerald-400" />
                      駐車場完備
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-emerald-400" />
                      シャワー施設あり
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="overnight" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50">
                  <Mountain className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">1泊2日プラン</h3>
                  <p className="text-emerald-200 mb-6">星空の下で過ごす特別な夜。本格的なキャンプ体験。</p>
                  <div className="text-4xl font-bold text-green-400 mb-6">¥8,500</div>
                  <Button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    予約する
                  </Button>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50">
                  <img
                    src="/overnight-camping-with-tent-under-stars.jpg"
                    alt="1泊2日キャンプ"
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <ul className="space-y-2 text-emerald-200">
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-400" />
                      テント・寝袋レンタル込み
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-400" />
                      焚き火セット付き
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-400" />
                      朝食サービス
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="weekend" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50">
                  <Trees className="w-12 h-12 text-lime-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">2泊3日プラン</h3>
                  <p className="text-emerald-200 mb-6">週末を自然の中で。充実のアクティビティ付き。</p>
                  <div className="text-4xl font-bold text-lime-400 mb-6">¥15,000</div>
                  <Button onClick={() => setIsBookingModalOpen(true)} className="w-full bg-lime-600 hover:bg-lime-700">
                    予約する
                  </Button>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50">
                  <img
                    src="/weekend-camping-with-hiking-and-activities.jpg"
                    alt="2泊3日キャンプ"
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <ul className="space-y-2 text-emerald-200">
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-lime-400" />
                      ガイド付きハイキング
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-lime-400" />
                      カヌー体験
                    </li>
                    <li className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-lime-400" />
                      全食事付き
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-green-950/50 to-emerald-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">楽しめるアクティビティ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50 hover:border-emerald-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <Flame className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">焚き火体験</h3>
              <p className="text-emerald-200 leading-relaxed">
                専用の焚き火スペースで、マシュマロを焼いたり、暖を取ったり。炎を囲んで語らう時間は格別です。
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50 hover:border-green-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
                <Mountain className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">トレッキング</h3>
              <p className="text-emerald-200 leading-relaxed">
                経験豊富なガイドと共に、周辺の山々を探索。四季折々の自然を満喫できます。
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50 hover:border-lime-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-lime-500/10 flex items-center justify-center mb-6 group-hover:bg-lime-500/20 transition-colors">
                <Trees className="w-6 h-6 text-lime-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">森林浴</h3>
              <p className="text-emerald-200 leading-relaxed">
                マイナスイオンたっぷりの森の中で、心身ともにリフレッシュ。ヨガ教室も開催中。
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50 hover:border-cyan-500/50 transition-all hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
                <Star className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">星空観察</h3>
              <p className="text-emerald-200 leading-relaxed">
                光害のない環境で見る満天の星空。天体望遠鏡も完備しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">お客様の声</h2>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50 p-12">
              <div className="flex items-center justify-center mb-6">
                {[...Array(testimonials[carouselIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-xl text-emerald-100 text-center mb-6 leading-relaxed">
                "{testimonials[carouselIndex].text}"
              </p>

              <p className="text-emerald-300 text-center font-semibold">{testimonials[carouselIndex].name}</p>
            </div>

            <button
              onClick={() => setCarouselIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-emerald-800 border border-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setCarouselIndex((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-emerald-800 border border-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === carouselIndex ? "bg-emerald-400 w-8" : "bg-emerald-700"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-gradient-to-b from-emerald-950/50 to-green-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">よくある質問</h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-emerald-700/50 rounded-xl px-6 bg-emerald-900/30 data-[state=open]:bg-emerald-900/50"
            >
              <AccordionTrigger className="text-white hover:text-emerald-300 text-left">
                初心者でも大丈夫ですか？
              </AccordionTrigger>
              <AccordionContent className="text-emerald-200">
                はい、もちろんです！初心者の方でも安心して楽しめるよう、スタッフが丁寧にサポートいたします。テントの設営方法から焚き火の起こし方まで、基本的なことは全てお教えします。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-emerald-700/50 rounded-xl px-6 bg-emerald-900/30 data-[state=open]:bg-emerald-900/50"
            >
              <AccordionTrigger className="text-white hover:text-emerald-300 text-left">
                レンタル品はありますか？
              </AccordionTrigger>
              <AccordionContent className="text-emerald-200">
                テント、寝袋、調理器具、BBQセットなど、キャンプに必要な道具は全てレンタル可能です。手ぶらでお越しいただいても大丈夫です。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-emerald-700/50 rounded-xl px-6 bg-emerald-900/30 data-[state=open]:bg-emerald-900/50"
            >
              <AccordionTrigger className="text-white hover:text-emerald-300 text-left">
                ペットは同伴できますか？
              </AccordionTrigger>
              <AccordionContent className="text-emerald-200">
                はい、ペット同伴可能なエリアをご用意しております。ただし、他のお客様のご迷惑にならないよう、リードの着用をお願いしております。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-emerald-700/50 rounded-xl px-6 bg-emerald-900/30 data-[state=open]:bg-emerald-900/50"
            >
              <AccordionTrigger className="text-white hover:text-emerald-300 text-left">
                キャンセル料はかかりますか？
              </AccordionTrigger>
              <AccordionContent className="text-emerald-200">
                7日前までのキャンセルは無料です。6日前から3日前までは50%、2日前以降は100%のキャンセル料が発生します。
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border border-emerald-700/50 rounded-xl px-6 bg-emerald-900/30 data-[state=open]:bg-emerald-900/50"
            >
              <AccordionTrigger className="text-white hover:text-emerald-300 text-left">
                雨天時はどうなりますか？
              </AccordionTrigger>
              <AccordionContent className="text-emerald-200">
                小雨程度であれば通常通り営業しております。屋根付きのスペースもございます。荒天の場合は、安全のため営業を中止する場合がございます。その際は全額返金いたします。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-white">アクセス・お問い合わせ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <MapPin className="w-6 h-6 text-emerald-400" />
                所在地
              </h3>
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img src="/map-location-camping-site-in-mountains.jpg" alt="地図" className="w-full h-full object-cover" />
              </div>
              <p className="text-emerald-200 mb-2">〒123-4567</p>
              <p className="text-emerald-200 mb-4">長野県○○市△△町1-2-3</p>
              <p className="text-emerald-200">車：東京から約2時間30分</p>
              <p className="text-emerald-200">電車：最寄り駅から無料送迎バスあり</p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-green-900/50 border border-emerald-700/50">
              <h3 className="text-2xl font-bold mb-6 text-white">お問い合わせ</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-emerald-200">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>0120-XXX-XXX</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-200">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <span>info@camping-resort.jp</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-200">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span>受付時間：9:00〜18:00</span>
                </div>
              </div>

              <Button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-lg"
              >
                オンライン予約はこちら
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-emerald-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">今すぐ予約しましょう</h2>
          <p className="text-xl text-emerald-100 mb-12">
            限定{countdown > 0 ? countdown : "終了準備中"}組様まで特別価格でご提供
          </p>

          <Button
            size="lg"
            onClick={() => setIsBookingModalOpen(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-12 py-8 text-xl rounded-full shadow-2xl shadow-emerald-500/50 transition-all hover:shadow-emerald-500/70 hover:scale-110"
          >
            <span className="relative z-10 flex items-center gap-3">
              予約する
              <Calendar className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            </span>
          </Button>
        </div>
      </section>

      {showBanner && (
        <div className="fixed bottom-4 right-4 z-40 animate-slide-up">
          <div className="bg-gradient-to-r from-emerald-900 to-green-900 border border-emerald-700 rounded-2xl p-6 shadow-2xl max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-emerald-200">残り枠</div>
              <div className="text-3xl font-bold text-emerald-300">{countdown > 0 ? countdown : "終了"}</div>
            </div>
            <Button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-full"
            >
              今すぐ予約する
            </Button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-40 w-14 h-14 rounded-full bg-slate-800 border border-slate-700 hover:border-blue-500 flex items-center justify-center text-white hover:bg-slate-700 transition-all hover:scale-110 shadow-lg animate-fade-in"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent aria-label="予約フォーム" className="max-w-2xl bg-gradient-to-br from-emerald-900 to-green-900 border-emerald-700 text-white">
          <DialogClose className="absolute right-4 top-4 rounded-full bg-emerald-800 hover:bg-emerald-700 p-2" />

          <div className="py-8">
            <h3 className="text-3xl font-bold mb-6 text-center">予約フォーム</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-emerald-100">
                    お名前
                  </Label>
                  <Input
                    id="name"
                    placeholder="山田 太郎"
                    className="bg-emerald-950/50 border-emerald-700 text-white placeholder:text-emerald-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-emerald-100">
                    メールアドレス
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="bg-emerald-950/50 border-emerald-700 text-white placeholder:text-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-emerald-100">
                    電話番号
                  </Label>
                  <Input
                    id="phone"
                    placeholder="090-1234-5678"
                    className="bg-emerald-950/50 border-emerald-700 text-white placeholder:text-emerald-400"
                  />
                </div>
                <div>
                  <Label htmlFor="guests" className="text-emerald-100">
                    人数
                  </Label>
                  <Input
                    id="guests"
                    type="number"
                    placeholder="2"
                    className="bg-emerald-950/50 border-emerald-700 text-white placeholder:text-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkin" className="text-emerald-100">
                    チェックイン
                  </Label>
                  <Input id="checkin" type="date" className="bg-emerald-950/50 border-emerald-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="checkout" className="text-emerald-100">
                    チェックアウト
                  </Label>
                  <Input id="checkout" type="date" className="bg-emerald-950/50 border-emerald-700 text-white" />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-6 text-lg"
              >
                予約を確定する
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent aria-label="特別オファー" className="max-w-2xl bg-gradient-to-br from-emerald-900 to-green-900 border-emerald-700 text-white">
          <DialogClose className="absolute right-4 top-4 rounded-full bg-emerald-800 hover:bg-emerald-700 p-2" />

          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 mb-6">
              <Tent className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-emerald-200">本日{currentDate}限定</span>
            </div>

            <h3 className="text-4xl font-bold mb-4">特別オファー</h3>

            <p className="text-xl text-emerald-100 mb-6">
              今だけ限定100組様に
              <br />
              特別価格でご提供中
            </p>

            <div className="text-5xl font-bold text-emerald-300 mb-8">
              残り {countdown > 0 ? countdown : "終了準備中"}
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-12 py-6 text-lg rounded-full shadow-lg"
              onClick={() => {
                setIsModalOpen(false)
                setIsBookingModalOpen(true)
              }}
            >
              今すぐ予約する
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent aria-label="ギャラリー" className="max-w-6xl bg-black/95 border-emerald-700 p-0">
          <button
            onClick={() => setIsGalleryOpen(false)}
            className="absolute right-4 top-4 z-50 w-10 h-10 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative">
            <img
              src={galleryImages[selectedImage].url || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-[80vh] object-contain"
            />

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full">
              <p className="text-white text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-emerald-800/50 py-8 px-4 text-center text-emerald-300 text-sm bg-emerald-950/50">
        <p>© 2025 森と湖のキャンプリゾート. All rights reserved.</p>
      </footer>
    </div>
  )
}
