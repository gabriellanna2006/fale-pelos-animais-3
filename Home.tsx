import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Heart, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    denunciante: "",
    email: "",
    telefone: "",
    endereco: "",
    descricao: "",
    tipo: "outro",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.denunciante || !formData.email || !formData.descricao) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    try {
      // Substitua pela URL do seu endpoint do Formspree
      const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.denunciante,
          email: formData.email,
          phone: formData.telefone,
          address: formData.endereco,
          type: formData.tipo,
          message: formData.descricao,
          _subject: `Nova Denúncia - Fale pelos Animais`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          denunciante: "",
          email: "",
          telefone: "",
          endereco: "",
          descricao: "",
          tipo: "outro",
        });

        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);

        toast.success("Denúncia enviada com sucesso! Obrigado por denunciar.");
      } else {
        toast.error("Erro ao enviar denúncia. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao enviar denúncia. Verifique sua conexão.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <h1 className="text-2xl font-bold text-primary">Fale pelos Animais</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#sobre" className="text-foreground hover:text-primary transition">Sobre</a>
            <a href="#denuncia" className="text-foreground hover:text-primary transition">Denúncia</a>
            <a href="#contato" className="text-foreground hover:text-primary transition">Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Proteja os Animais de Raul Soares</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Denuncie maus-tratos e ajude a salvar vidas. Seu anonimato é garantido.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => document.getElementById("denuncia")?.scrollIntoView({ behavior: "smooth" })}
          >
            Fazer uma Denúncia
          </Button>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 mx-4 mt-4 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>Denúncia enviada com sucesso! Obrigado por sua ação em prol dos animais.</span>
        </div>
      )}

      {/* About Section */}
      <section id="sobre" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Por que Denunciar?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition">
              <AlertCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Proteção Legal</h3>
              <p className="text-muted-foreground">
                Maus-tratos de animais é crime previsto em lei. Denúncias ajudam a responsabilizar agressores.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition">
              <Heart className="w-12 h-12 text-primary mb-4 fill-primary" />
              <h3 className="text-xl font-bold mb-2">Salvando Vidas</h3>
              <p className="text-muted-foreground">
                Sua denúncia pode salvar um animal do sofrimento e garantir seu bem-estar.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition">
              <Phone className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Anonimato Garantido</h3>
              <p className="text-muted-foreground">
                Você pode denunciar sem se identificar. Sua segurança é nossa prioridade.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Denuncia Form Section */}
      <section id="denuncia" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">Faça sua Denúncia</h2>
          <p className="text-center text-muted-foreground mb-8">
            Preencha o formulário abaixo com as informações sobre o caso de maus-tratos.
          </p>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Denunciante */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nome do Denunciante (Opcional)
                </label>
                <Input
                  type="text"
                  name="denunciante"
                  value={formData.denunciante}
                  onChange={handleChange}
                  placeholder="Seu nome (pode deixar em branco)"
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  E-mail *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@example.com"
                  required
                  className="w-full"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Telefone (Opcional)
                </label>
                <Input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(31) 99999-9999"
                  className="w-full"
                />
              </div>

              {/* Endereço */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Endereço do Caso (Opcional)
                </label>
                <Input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Rua, número, bairro..."
                  className="w-full"
                />
              </div>

              {/* Tipo de Maus-trato */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tipo de Maus-trato
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="negligencia">Negligência</option>
                  <option value="agressao">Agressão Física</option>
                  <option value="abandono">Abandono</option>
                  <option value="exploracao">Exploração</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Descrição Detalhada do Caso *
                </label>
                <Textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descreva com detalhes o que você presenciou ou sabe sobre o caso..."
                  required
                  rows={6}
                  className="w-full"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-semibold"
              >
                {isSubmitting ? "Enviando..." : "Enviar Denúncia"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Seus dados serão enviados para falepelosanimais@gmail.com e tratados com confidencialidade.
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Tipos de Maus-tratos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Negligência</h3>
              <p className="text-muted-foreground">
                Falta de cuidados básicos como alimentação, água, abrigo ou atendimento veterinário.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Agressão Física</h3>
              <p className="text-muted-foreground">
                Violência, pancadas, queimaduras ou qualquer forma de agressão contra o animal.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Abandono</h3>
              <p className="text-muted-foreground">
                Deixar um animal sem cuidados, sozinho ou em situação de risco.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Exploração</h3>
              <p className="text-muted-foreground">
                Uso inadequado do animal para trabalho, combates ou outros fins prejudiciais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Entre em Contato</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <Card className="p-6 text-center">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">E-mail</h3>
              <p className="text-muted-foreground">falepelosanimais@gmail.com</p>
            </Card>
            <Card className="p-6 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Localização</h3>
              <p className="text-muted-foreground">Raul Soares, MG</p>
            </Card>
            <Card className="p-6 text-center">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Emergência</h3>
              <p className="text-muted-foreground">Ligue para a polícia: 190</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; 2024 Fale pelos Animais. Todos os direitos reservados.</p>
          <p className="text-sm opacity-90">
            Protegendo os animais de Raul Soares, um denúncia por vez.
          </p>
        </div>
      </footer>
    </div>
  );
}
