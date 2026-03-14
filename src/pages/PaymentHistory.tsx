import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/DashboardHeader';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Avatar } from '../components/ui/avatar';
import {
  ArrowLeft,
  Download,
  Filter,
  Search,
  Calendar,
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Receipt,
  FileText,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Database queries will populate this array; currently empty
  const payments = [];

  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesType = filterType === 'all' ||
      (filterType === 'payments' && payment.type === 'payment') ||
      (filterType === 'refunds' && payment.type === 'refund');
    const matchesSearch = !searchQuery ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  const totalSpent = payments
    .filter(p => p.type === 'payment' && p.status === 'completed')
    .reduce((sum, p) => sum + Math.abs(p.amount), 0);

  const totalRefunds = payments
    .filter(p => p.type === 'refund' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + Math.abs(p.amount), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Receipt className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Payment History</h1>
            <p className="text-gray-600">
              View and manage all your transactions, invoices, and payment records.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-red-600">£{totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">This year</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Refunds Received</p>
                  <p className="text-2xl font-bold text-green-600">£{totalRefunds.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">This year</p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-yellow-600">£{pendingPayments.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Awaiting processing</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold">{payments.length}</p>
                  <p className="text-xs text-gray-500 mt-1">All time</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search payments, providers, or transaction IDs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="refunds">Refunds</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Transaction History</span>
              <Badge variant="outline">{filteredPayments.length} transactions</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(payment.status)}
                    </div>

                    <Avatar className="h-10 w-10">
                      <img src={payment.provider.avatar} alt={payment.provider.name} />
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{payment.description}</p>
                      <p className="text-xs text-gray-600 truncate">{payment.provider.name} • {payment.provider.service}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{payment.transactionId}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`font-semibold ${payment.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {payment.amount > 0 ? '+' : ''}£{Math.abs(payment.amount).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">{payment.paymentMethod}</p>
                    </div>

                    <div className="text-center">
                      {getStatusBadge(payment.status)}
                    </div>

                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No transactions found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Load More */}
        {filteredPayments.length >= 10 && (
          <div className="text-center mt-6">
            <Button variant="outline">
              Load More Transactions
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
