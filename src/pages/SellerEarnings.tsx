import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SellerDashboardHeader } from '../components/SellerDashboardHeader';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  CreditCard,
  Wallet,
  PiggyBank,
  BarChart3,
  AlertCircle,
  Clock
} from 'lucide-react';

export default function SellerEarnings() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('month');

  // Mock earnings data
  const earningsData = {
    overview: {
      available: 12450,
      pending: 2150,
      total: 89450,
      thisMonth: 12450,
      lastMonth: 11200,
      growth: 11.2
    },
    monthlyBreakdown: [
      { month: 'Jan 2024', earnings: 11200, orders: 18 },
      { month: 'Dec 2023', earnings: 10800, orders: 16 },
      { month: 'Nov 2023', earnings: 9500, orders: 14 },
      { month: 'Oct 2023', earnings: 10200, orders: 15 },
      { month: 'Sep 2023', earnings: 8900, orders: 13 },
      { month: 'Aug 2023', earnings: 9750, orders: 14 }
    ],
    recentTransactions: [
      {
        id: 'TXN-001',
        type: 'earning',
        amount: 1250,
        description: 'CQC Registration Package - Sarah Mitchell',
        date: '2024-01-15',
        status: 'completed'
      },
      {
        id: 'TXN-002',
        type: 'earning',
        amount: 850,
        description: 'Healthcare Compliance Audit - David Thompson',
        date: '2024-01-12',
        status: 'completed'
      },
      {
        id: 'TXN-003',
        type: 'withdrawal',
        amount: -5000,
        description: 'Bank transfer to account ending in ****1234',
        date: '2024-01-10',
        status: 'completed'
      },
      {
        id: 'TXN-004',
        type: 'earning',
        amount: 2200,
        description: 'Care Home Licensing Support - Emma Wilson',
        date: '2024-01-08',
        status: 'pending'
      },
      {
        id: 'TXN-005',
        type: 'fee',
        amount: -125,
        description: 'Platform fee - January',
        date: '2024-01-01',
        status: 'completed'
      }
    ]
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'withdrawal': return <Wallet className="h-4 w-4 text-blue-600" />;
      case 'fee': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earning': return 'text-green-600';
      case 'withdrawal': return 'text-blue-600';
      case 'fee': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerDashboardHeader />

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

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Earnings</h1>
              <p className="text-gray-600">
                Track your revenue, view transaction history, and manage withdrawals.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Balance</p>
                  <p className="text-2xl font-bold">£{earningsData.overview.available.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">
                    Ready for withdrawal
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Clearance</p>
                  <p className="text-2xl font-bold">£{earningsData.overview.pending.toLocaleString()}</p>
                  <p className="text-xs text-blue-600 mt-1">
                    In processing
                  </p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">£{earningsData.overview.thisMonth.toLocaleString()}</p>
                  <p className={`text-xs mt-1 flex items-center ${
                    earningsData.overview.growth > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {earningsData.overview.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {earningsData.overview.growth > 0 ? '+' : ''}{earningsData.overview.growth}% from last month
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold">£{earningsData.overview.total.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    All time earnings
                  </p>
                </div>
                <PiggyBank className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Breakdown */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningsData.monthlyBreakdown.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium">{month.month}</div>
                        <Badge variant="secondary">{month.orders} orders</Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">£{month.earnings.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Avg: £{Math.round(month.earnings / month.orders).toLocaleString()}/order</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Earnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    £{earningsData.overview.available.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Available for withdrawal
                  </p>
                  <Button className="w-full" disabled={earningsData.overview.available === 0}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Withdraw Funds
                  </Button>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Minimum withdrawal: £50<br />
                    Processing time: 2-3 business days
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bank Account</span>
                    <Badge variant="secondary">****1234</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">PayPal</span>
                    <Badge variant="outline">Not Connected</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Update Payment Methods
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Transactions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earningsData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(transaction.date).toLocaleDateString()}
                        <Badge variant="outline" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                    {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Full Transaction History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
