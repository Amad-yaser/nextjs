'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Award, Clock, Target, Code, Heart } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: '150+', label: 'عميل سعيد' },
    { icon: <Award className="w-8 h-8" />, number: '200+', label: 'مشروع مكتمل' },
    { icon: <Clock className="w-8 h-8" />, number: '5+', label: 'سنوات خبرة' },
    { icon: <Target className="w-8 h-8" />, number: '98%', label: 'رضا العملاء' }
  ]

  const values = [
    {
      icon: <Code className="w-10 h-10 text-blue-600" />,
      title: 'الجودة في الكود',
      description: 'نكتب كود نظيف وفعال وقابل للصيانة باستخدام أفضل الممارسات'
    },
    {
      icon: <Heart className="w-10 h-10 text-red-600" />,
      title: 'الشغف بالعمل',
      description: 'نحب ما نفعله ونسعى دائماً لتقديم أفضل النتائج'
    },
    {
      icon: <Users className="w-10 h-10 text-green-600" />,
      title: 'العمل الجماعي',
      description: 'نؤمن بقوة الفريق ونعمل معاً لتحقيق أهداف العملاء'
    },
    {
      icon: <Target className="w-10 h-10 text-purple-600" />,
      title: 'التركيز على الهدف',
      description: 'نفهم احتياجات العملاء ونعمل على تحقيق أهدافهم بدقة'
    }
  ]

  const team = [
    {
      name: 'أحمد محمد',
      position: 'مطور Full Stack',
      expertise: ['React', 'Node.js', 'Python'],
      description: 'خبير في تطوير تطبيقات الويب المعقدة'
    },
    {
      name: 'فاطمة علي',
      position: 'مصممة UI/UX',
      expertise: ['Figma', 'Adobe XD', 'تصميم متجاوب'],
      description: 'متخصصة في تصميم تجارب مستخدم مذهلة'
    },
    {
      name: 'محمد سعيد',
      position: 'مطور موبايل',
      expertise: ['React Native', 'Flutter', 'iOS/Android'],
      description: 'محترف في تطوير التطبيقات الأصلية'
    },
    {
      name: 'نورا حسن',
      position: 'خبير تسويق رقمي',
      expertise: ['SEO', 'Google Ads', 'Content Marketing'],
      description: 'استراتيجي تسويق ذو خبرة واسعة'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            من نحن
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن فريق من المطورين والمصممين الشغوفين الذين يسعون لتقديم حلول رقمية مبتكرة تساعد عملائنا على النجاح
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-blue-600 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story */}
        <div className="bg-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            قصتنا
          </h2>
          <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed">
            <p className="mb-4">
              بدأت رحلتنا في عام 2019 كمجموعة صغيرة من المطورين الذين شاركهم نفس الشغف للتكنولوجيا والابتكار.
              لاحظنا وجود فجوة في السوق بين الشركات التي تقدم حلولاً رقمية عالية الجودة وبين الشركات التي تقدمها بأسعار معقولة.
            </p>
            <p className="mb-4">
              قررنا سد هذه الفجوة من خلال تقديم خدمات عالية الجودة بأسعار تنافسية، مع التركيز على فهم احتياجات العملاء وتقديم حلول مخصصة تناسب أعمالهم.
            </p>
            <p>
              اليوم، نحن فريق متكامل يضم أفضل المواهب في مجالات التطوير والتصميم والتسويق الرقمي، ونفخر بتقديم حلول مبتكرة تساعد عملائنا على تحقيق أهدافهم والنمو في العالم الرقمي.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            قيمنا
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            فريقنا
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 mb-2">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            انضم إلى فريقنا
          </h2>
          <p className="text-xl mb-8">
            نبحث دائماً عن المواهب الشغوفة للانضمام إلى فريقنا
          </p>
          <a 
            href="mailto:careers@ciar.com" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            أرسل سيرتك الذاتية
          </a>
        </div>
      </div>
    </div>
  )
}