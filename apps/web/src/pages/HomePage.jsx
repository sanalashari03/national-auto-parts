import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Award, Clock, DollarSign, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const headlines = [
    "National Auto Parts Co.",
    "For All Land Rover Parts",
    "65,000+ Parts In Stock"
  ];

  const observerRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentText = headlines[typewriterIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && typewriterText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typewriterText === '') {
        setIsDeleting(false);
        setTypewriterIndex((prev) => (prev + 1) % headlines.length);
      } else if (isDeleting) {
        setTypewriterText(currentText.substring(0, typewriterText.length - 1));
      } else {
        setTypewriterText(currentText.substring(0, typewriterText.length + 1));
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, typewriterIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const Counter = ({ end, suffix = '' }) => {
    return (
      <div className="text-4xl md:text-5xl font-bold text-gold">
        {end.toLocaleString()}{suffix}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Message sent successfully. We will contact you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' }
  ];

  const products = [
    {
      image: '/images/6c11ec1729adab6e78c193e5212ed12f.webp',
      name: 'V8 Petrol Engines',
      description: 'High-performance Land Rover V8 engines'
    },
    {
      image: '/images/5a63da20fd0eadb9dea26ff243c4dca0.webp',
      name: 'Stop Lamps',
      description: 'OEM-quality rear lighting components'
    },
    {
      image: '/images/f93212a37ccbd75ef018338ec381ad86.webp',
      name: 'Start Power Batteries',
      description: 'Reliable starting batteries for all models'
    },
    {
      image: '/images/786ce5c5721d68d324cd2cf16f3f373f.webp',
      name: 'ESS PEE (SP) Batteries',
      description: 'Sole agent for SP battery range'
    },
    {
      image: '/images/20eb8e0b5a9ecffc6ebb58a0e1b7ba6e.webp',
      name: 'Shell Helix Lubricants',
      description: 'Authorized Shell dealer, full lubricant range'
    },
    {
      image: '/images/2a098cc82762ea4bbbeccb14db8b1c6b.webp',
      name: 'Fuel Pumps',
      description: 'Genuine and aftermarket fuel system parts'
    }
  ];

  const features = [
    {
      icon: <Award className="w-10 h-10 text-gold" />,
      title: 'Quality Products',
      description: 'We source only the finest OEM and genuine parts'
    },
    {
      icon: <Clock className="w-10 h-10 text-gold" />,
      title: 'Fast Delivery',
      description: 'Same-day shipping on orders before 5:00 PM'
    },
    {
      icon: <DollarSign className="w-10 h-10 text-gold" />,
      title: 'Best Price Guaranteed',
      description: 'Competitive pricing on all Land Rover parts'
    },
    {
      icon: <RotateCcw className="w-10 h-10 text-gold" />,
      title: 'Easy Returns',
      description: 'Hassle-free returns within 30 days'
    }
  ];

  return (
    <>
      <Helmet>
        <title>NAPCO UAE - National Auto Parts Co. | Land Rover Parts Specialist Since 1963</title>
        <meta name="description" content="NAPCO UAE is your trusted supplier of genuine, OEM and aftermarket Land Rover parts. 65,000+ parts in stock, established 1963. Call +971 6 533 2233" />
      </Helmet>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <button onClick={scrollToTop} className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
              <div>
                <img
                  src="/images/7de99f05df3aff193c261d5c482d4b0c.webp"
                  alt="NAPCO - National Auto Parts Co. Est. 1963"
                  className="h-10 md:h-16 w-auto object-contain"
                />
              </div>
            </button>

            <div className="hidden md:flex space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-bold ${
                    scrolled 
                      ? 'text-navy hover:bg-navy hover:text-white' 
                      : 'text-navy hover:bg-navy hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${scrolled ? 'text-navy' : 'text-navy bg-white/30 backdrop-blur-sm'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="bg-white px-4 py-4 space-y-2 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-navy hover:bg-navy hover:text-white rounded-xl transition-all duration-200 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section
        className="min-h-[100dvh] relative flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://media.cdn-jaguarlandrover.com/api/v2/images/105583/w/1216/h/684.jpg)'
        }}
      >
        {/* Removed the dark gradient overlay to match the original live site look */}
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 min-h-[100px] md:min-h-[160px] flex items-center justify-center leading-[1.1]" style={{ letterSpacing: '-0.02em', textBalance: 'balance' }}>
            {typewriterText}<span className="animate-pulse">|</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Dedicated suppliers of genuine, OEM & aftermarket parts since 1963
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+97165332233">
              <Button className="bg-gold text-navy hover:bg-white hover:text-navy font-semibold px-8 py-6 text-lg transition-all duration-200 active:scale-[0.98]">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </Button>
            </a>
            <a href="#products">
              <Button variant="outline" className="border-2 border-gold text-navy bg-gold hover:bg-white hover:border-white hover:text-navy font-semibold px-8 py-6 text-lg transition-all duration-200 active:scale-[0.98]">
                Explore Products
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-dark-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Counter end={65000} suffix="+" />
              <div className="text-gray-300 mt-2 text-sm md:text-base font-medium">Parts</div>
            </div>
            <div>
              <Counter end={50} suffix="+" />
              <div className="text-gray-300 mt-2 text-sm md:text-base font-medium">Years</div>
            </div>
            <div>
              <Counter end={3} />
              <div className="text-gray-300 mt-2 text-sm md:text-base font-medium">Branches</div>
            </div>
            <div>
              <Counter end={1963} />
              <div className="text-gray-300 mt-2 text-sm md:text-base font-medium">Est.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            ref={(el) => (observerRefs.current[0] = el)}
            className="fade-in text-3xl md:text-4xl font-bold text-center mb-12 text-navy"
            style={{ textBalance: 'balance' }}
          >
            Who Are We
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              ref={(el) => (observerRefs.current[1] = el)}
              className="fade-in space-y-6"
            >
              <p className="text-base leading-relaxed text-gray-700 max-w-prose">
                For 50 years we have been a dedicated supplier of Parts and Accessories for all Land Rovers including Range Rover, Range Rover Sport, Discovery, Freelander, Defender, and Bedford. National Auto Parts Co. was established in 1963 and now has three branches. We have specialized in offering quality OEM, genuine, and aftermarket parts and accessories. We have more than 65,000 parts and accessories in stock. We are the sole Agent of SP batteries and Authorized dealer of Shell Products. We have established long-standing partnerships with many major brands in this industry which include both Original Equipment and prominent Aftermarket names.
              </p>

              <div className="flex flex-wrap gap-3">
                {['OEM Parts', 'Genuine Parts', 'Aftermarket', 'SP Batteries', 'Shell Products'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-navy text-gold text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              ref={(el) => (observerRefs.current[2] = el)}
              className="fade-in relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="/images/about-us.png"
                  alt="NAPCO Excellence Since 1963"
                  className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold text-gold mb-2">Excellence Since 1963</h3>
                    <p className="text-gray-200">Trusted by thousands of Land Rover owners across the UAE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gold py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-navy mb-2" style={{ textBalance: 'balance' }}>
                Order Your Parts Today!
              </h3>
              <p className="text-navy/90 leading-relaxed max-w-3xl">
                We guarantee the lowest prices on all Land Rover parts — in stock and ready for immediate delivery and shipping worldwide. Orders received before 5:00 PM ship the same business day.
              </p>
            </div>
            <a href="tel:+97165332233" className="shrink-0">
              <Button className="bg-navy text-gold hover:bg-navy/90 font-semibold px-8 py-6 text-lg transition-all duration-200 active:scale-[0.98] whitespace-nowrap">
                Call Us Now → +971 6 533 2233
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-navy blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2
              ref={(el) => (observerRefs.current[3] = el)}
              className="fade-in text-3xl md:text-5xl font-bold text-navy mb-4"
              style={{ textBalance: 'balance' }}
            >
              Premium Parts Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explore our extensive range of high-quality Land Rover components, sourced from world-class manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <div
                key={product.name}
                ref={(el) => (observerRefs.current[4 + index] = el)}
                className="fade-in group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-56 md:h-64 overflow-hidden bg-white p-6 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow bg-white">
                  <h3 className="text-xl md:text-2xl font-bold text-navy mb-2 group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Single Inquire Now button after all products */}
          <div className="flex justify-center mt-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-navy text-white hover:bg-gold hover:text-navy font-bold px-10 py-4 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Inquire Now
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section id="why-us" className="py-24 bg-navy relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2
              ref={(el) => (observerRefs.current[10] = el)}
              className="fade-in text-3xl md:text-5xl font-bold text-gold mb-4"
              style={{ textBalance: 'balance' }}
            >
              The NAPCO Advantage
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Since 1963, we've built our reputation on quality, speed, and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                ref={(el) => (observerRefs.current[11 + index] = el)}
                className="fade-in group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-gold/30 hover:-translate-y-2"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/20 group-hover:from-gold group-hover:to-gold/80 transition-all duration-500">
                    <div className="transition-colors duration-500 transform group-hover:scale-110">
                      {React.cloneElement(feature.icon, { className: "w-10 h-10 text-gold group-hover:text-navy transition-colors duration-500" })}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-center text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            ref={(el) => (observerRefs.current[15] = el)}
            className="fade-in text-3xl md:text-4xl font-bold text-center mb-12 text-navy"
            style={{ textBalance: 'balance' }}
          >
            Contact Us Today
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-navy rounded-2xl p-8 text-center">
              <Phone className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Phone</h3>
              <div className="space-y-2">
                <a href="tel:+97165332233" className="block text-gold hover:underline">
                  +971 6 533 2233
                </a>
                <a href="tel:+97165332109" className="block text-gold hover:underline">
                  +971 6 533 2109
                </a>
                <a href="tel:+97165332271" className="block text-gold hover:underline">
                  +971 6 533 2271
                </a>
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-8 text-center">
              <Mail className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Email</h3>
              <a href="mailto:napco184@emirates.net.ae" className="text-gold hover:underline break-all">
                napco184@emirates.net.ae
              </a>
            </div>

            <div className="bg-navy rounded-2xl p-8 text-center">
              <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Address</h3>
              <p className="text-gray-300 leading-relaxed">
                P.O.Box #240, BMW Road, Industrial Area 2, Sharjah – UAE
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Full Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-gray-900 placeholder:text-gray-500 border border-gray-300"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-gray-900 placeholder:text-gray-500 border border-gray-300"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">Subject</label>
                <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                  <SelectTrigger className="w-full order border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Feedback">Feedback</SelectItem>
                    <SelectItem value="Complaint">Complaint</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full min-h-[150px] text-gray-900 order border-gray-300 placeholder:text-gray-500"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold py-6 text-lg transition-all duration-200 active:scale-[0.98]">
                Send Inquiry
              </Button>
            </form>

            <div className="rounded-2xl overflow-hidden h-[500px] border-4 border-navy shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.645364842611!2d55.3980362!3d25.3161164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5bfeb127f701%3A0x700e8700ed5d2337!2sNational%20Auto%20Parts%20LLC!5e0!3m2!1sen!2sae!4v1776510509530!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NAPCO UAE Location - BMW Road, Industrial Area 2, Sharjah"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <button onClick={scrollToTop} className="block cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <img
                  src="/images/7de99f05df3aff193c261d5c482d4b0c.webp"
                  alt="NAPCO - National Auto Parts Co."
                  className="h-12 md:h-16 w-auto object-contain mb-4"
                />
              </button>
              <p className="text-gray-400 leading-relaxed">Your trusted Land Rover parts partner since 1963</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} className="block text-gray-400 hover:text-gold transition-colors duration-200">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-start gap-2">
                  <Phone className="w-5 h-5 shrink-0 mt-0.5 text-gold" />
                  <span>+971 6 533 2233</span>
                </p>
                <p className="flex items-start gap-2">
                  <Mail className="w-5 h-5 shrink-0 mt-0.5 text-gold" />
                  <span className="break-all">napco184@emirates.net.ae</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-gold" />
                  <span>P.O.Box #240, BMW Road, Sharjah, UAE</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">© 2026 NAPCO UAE — All Rights Reserved</p>
          </div>
        </div>
      </footer>

      <a
        href="tel:+97165332233"
        className="md:hidden fixed bottom-6 right-6 z-40 bg-gold text-navy p-4 rounded-full shadow-2xl hover:bg-gold/90 transition-all duration-200 active:scale-[0.98] flex items-center justify-center"
      >
        <Phone className="w-6 h-6" />
      </a>
    </>
  );
};

export default HomePage;